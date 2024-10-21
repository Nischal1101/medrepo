import { withAuth } from "next-auth/middleware";

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

export const config = {
  matcher: ["/reports(/.*)?", "/upload-report"],
};
