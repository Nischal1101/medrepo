import { withAuth } from "next-auth/middleware";
export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.nextUrl.pathname.startsWith("/upload-reports")) {
        return token?.role === "hospital";
      } else {
        return true;
      }
    },
  },
});

export const config = {
  matcher: ["/reports(/.*)?", "/upload-report"],
};
