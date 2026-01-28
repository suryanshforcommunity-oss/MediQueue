import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore"
import { db } from "./firebase"

// Types
export interface Appointment {
  id?: string
  patientId: string
  patientName: string
  patientPhone: string
  patientAge: number
  patientGender: string
  doctorId: string
  doctorName: string
  department: string
  date: string
  timeSlot: string
  tokenNumber: number
  status: "scheduled" | "waiting" | "serving" | "completed" | "cancelled"
  symptoms?: string
  createdAt?: Date
}

export interface QueueEntry {
  id?: string
  appointmentId: string
  patientId: string
  patientName: string
  doctorId: string
  tokenNumber: number
  status: "waiting" | "next" | "serving" | "completed"
  checkInTime?: Date
  startTime?: Date
  endTime?: Date
}

export interface PatientHistory {
  id?: string
  patientId: string
  doctorId: string
  doctorName: string
  department: string
  date: string
  diagnosis: string
  prescription: string[]
  followUp?: string
  createdAt?: Date
}

// Appointments
export async function createAppointment(data: Omit<Appointment, "id" | "createdAt">) {
  const docRef = await addDoc(collection(db, "appointments"), {
    ...data,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export async function getAppointmentsByPatient(patientId: string) {
  const q = query(collection(db, "appointments"), where("patientId", "==", patientId), orderBy("date", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Appointment)
}

export async function getAppointmentsByDoctor(doctorId: string, date: string) {
  const q = query(
    collection(db, "appointments"),
    where("doctorId", "==", doctorId),
    where("date", "==", date),
    orderBy("timeSlot"),
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Appointment)
}

export async function updateAppointmentStatus(appointmentId: string, status: Appointment["status"]) {
  await updateDoc(doc(db, "appointments", appointmentId), { status })
}

// Queue
export async function addToQueue(data: Omit<QueueEntry, "id">) {
  const docRef = await addDoc(collection(db, "queue"), {
    ...data,
    checkInTime: serverTimestamp(),
  })
  return docRef.id
}

export function subscribeToQueue(doctorId: string, callback: (queue: QueueEntry[]) => void) {
  const q = query(
    collection(db, "queue"),
    where("doctorId", "==", doctorId),
    where("status", "in", ["waiting", "next", "serving"]),
    orderBy("tokenNumber"),
  )

  return onSnapshot(q, (snapshot) => {
    const queue = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as QueueEntry)
    callback(queue)
  })
}

export async function updateQueueStatus(queueId: string, status: QueueEntry["status"]) {
  const updates: DocumentData = { status }
  if (status === "serving") {
    updates.startTime = serverTimestamp()
  } else if (status === "completed") {
    updates.endTime = serverTimestamp()
  }
  await updateDoc(doc(db, "queue", queueId), updates)
}

export async function callNextPatient(doctorId: string) {
  // Get current queue
  const q = query(
    collection(db, "queue"),
    where("doctorId", "==", doctorId),
    where("status", "in", ["waiting", "next", "serving"]),
    orderBy("tokenNumber"),
  )
  const snapshot = await getDocs(q)
  const queue = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as QueueEntry)

  // Mark current serving as completed
  const serving = queue.find((e) => e.status === "serving")
  if (serving?.id) {
    await updateQueueStatus(serving.id, "completed")
  }

  // Mark next as serving
  const next = queue.find((e) => e.status === "next")
  if (next?.id) {
    await updateQueueStatus(next.id, "serving")
  }

  // Mark first waiting as next
  const firstWaiting = queue.find((e) => e.status === "waiting")
  if (firstWaiting?.id) {
    await updateQueueStatus(firstWaiting.id, "next")
  }
}

// Patient History
export async function addPatientHistory(data: Omit<PatientHistory, "id" | "createdAt">) {
  const docRef = await addDoc(collection(db, "patientHistory"), {
    ...data,
    createdAt: serverTimestamp(),
  })
  return docRef.id
}

export async function getPatientHistory(patientId: string) {
  const q = query(collection(db, "patientHistory"), where("patientId", "==", patientId), orderBy("date", "desc"))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as PatientHistory)
}

// Generate next token number for a doctor on a specific date
export async function getNextTokenNumber(doctorId: string, date: string): Promise<number> {
  const q = query(collection(db, "appointments"), where("doctorId", "==", doctorId), where("date", "==", date))
  const snapshot = await getDocs(q)
  return snapshot.size + 1
}
