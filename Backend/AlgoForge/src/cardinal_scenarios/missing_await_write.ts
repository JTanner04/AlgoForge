export async function saveAuditLog(db: any, payload: any) {
  db.auditLogs.insert(payload); // missing await on critical write
  return { ok: true };
}

