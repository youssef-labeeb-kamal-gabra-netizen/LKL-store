export interface ContactRequest {
  id: string;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  message: string;
  status: "NEW" | "CONTACTED" | "RESOLVED" | "ARCHIVED";
  createdAt: string;
}

// Global in-memory storage for development and runtime persistence
declare global {
  var __lkl_contact_requests: ContactRequest[] | undefined;
}

const initialRequests: ContactRequest[] = [
  {
    id: "req-1",
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
  if (!global.__lkl_contact_requests) {
    global.__lkl_contact_requests = [...initialRequests];
  }
  return global.__lkl_contact_requests;
}

export function addContactRequest(data: Omit<ContactRequest, "id" | "status" | "createdAt">): ContactRequest {
  const requests = getContactRequests();
  const newReq: ContactRequest = {
    id: `req-${Date.now()}`,
    ...data,
    status: "NEW",
    createdAt: new Date().toISOString(),
  };
  requests.unshift(newReq);
  return newReq;
}

export function updateContactRequestStatus(id: string, status: ContactRequest["status"]): boolean {
  const requests = getContactRequests();
  const req = requests.find((r) => r.id === id);
  if (!req) return false;
  req.status = status;
  return true;
}
