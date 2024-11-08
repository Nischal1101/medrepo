export { auth as middleware } from "@/lib/auth";
export const config = {
  matcher: ["/doctor/report(/.*)?", "/report(/.*)?", "/upload-report"],
};
