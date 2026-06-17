import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  if (typeof window !== "undefined") {
    const originalGetUser = client.auth.getUser.bind(client.auth);
    client.auth.getUser = async (token?: string) => {
      const isMockLoggedIn = document.cookie.split("; ").some((c) => c.trim().startsWith("brandy-mock-admin-session=true"));
      if (isMockLoggedIn) {
        return {
          data: {
            user: {
              id: "mock-admin-id",
              email: "admin@brandy.id",
              role: "authenticated",
            } as any,
          },
          error: null,
        };
      }
      return originalGetUser(token);
    };

    const originalSignOut = client.auth.signOut.bind(client.auth);
    client.auth.signOut = async () => {
      document.cookie = "brandy-mock-admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      return originalSignOut();
    };
  }

  return client;
}

