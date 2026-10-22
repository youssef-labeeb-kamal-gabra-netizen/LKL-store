import crypto from "crypto";
import { readStorageFile, writeStorageFile } from "@/lib/storage";

export type ContactRequestStatus = "NEW" | "CONTACTED" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED";

export interface ContactRequest {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  message: string;
  status: ContactRequestStatus;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}

const STORAGE_FILE = "inquiries.json";

const initialRequests: ContactRequest[] = [
  {
    id: "req-initial-1",
    name: "م. حسام السيد",
    phone: "01012345678",
    email: "hossam@example.com",
    product: "high-pressure-agricultural-spray-motor",
    message: "أود الاستفسار عن ضغط موتور الرش وإمكانية تزويده بخرطوم 100 متر.",
    status: "NEW",
    createdAt: new Date().toISOString(),
  },
];

export function getContactRequests(): ContactRequest[] {
  return readStorageFile<ContactRequest[]>(STORAGE_FILE, initialRequests);
}

export function addContactRequest(data: Omit<ContactRequest, "id" | "status" | "createdAt">): ContactRequest {
  const requests = getContactRequests();
  const id = `req-${crypto.randomUUID()}`;
  const now = new Date().toISOString();

  const newReq: ContactRequest = {
    id,
    ...data,
    status: "NEW",
    createdAt: now,
    updatedAt: now,
  };

  requests.unshift(newReq);
  writeStorageFile(STORAGE_FILE, requests);
  return newReq;
}

export function updateContactRequestStatus(
  id: string,
  status: ContactRequestStatus,
  notes?: string
): ContactRequest | null {
  const requests = getContactRequests();
  const req = requests.find((r) => r.id === id);
  if (!req) return null;

  req.status = status;
  req.updatedAt = new Date().toISOString();
  if (notes !== undefined) {
    req.notes = notes;
  }

  writeStorageFile(STORAGE_FILE, requests);
  return req;
}

export function deleteContactRequest(id: string): boolean {
  const requests = getContactRequests();
  const filtered = requests.filter((r) => r.id !== id);
  if (filtered.length === requests.length) return false;

  writeStorageFile(STORAGE_FILE, filtered);
  return true;
}
