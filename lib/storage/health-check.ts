import {
  generateHealthCheckReport,
  type HealthCheckReport,
} from "../calculations/report";
import type { HealthCheckFormData } from "../types/health-check";
import { HEALTH_CHECK_STORAGE_KEY } from "../types/health-check";

export type StoredHealthCheck = {
  formData: HealthCheckFormData;
  report: HealthCheckReport;
};

export function saveHealthCheckAndReport(formData: HealthCheckFormData): void {
  const payload: StoredHealthCheck = {
    formData,
    report: generateHealthCheckReport(formData),
  };
  sessionStorage.setItem(HEALTH_CHECK_STORAGE_KEY, JSON.stringify(payload));
}

export function loadHealthCheckReport(): StoredHealthCheck | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(HEALTH_CHECK_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredHealthCheck;
  } catch {
    return null;
  }
}

export function clearHealthCheckReport(): void {
  sessionStorage.removeItem(HEALTH_CHECK_STORAGE_KEY);
}
