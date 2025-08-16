import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      role?: string;
      backendToken?: string; // <-- required!
    };
  }
  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    role?: string;
    backendToken?: string; // <-- required!
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    backendToken?: string; // <-- required!
  }
}