/*
export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (token && req.nextUrl.pathname.startsWith("/upload-report")) {
        return token.role === "hospital";
      }
      return !!token;
    },
  },
});
*/
export { auth as middleware } from "@/lib/auth";
export const config = {
  matcher: ["/reports(/.*)?", "/upload-report"],
};
