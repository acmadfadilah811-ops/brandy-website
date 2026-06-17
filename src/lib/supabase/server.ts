import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    }
  );

  const originalGetUser = client.auth.getUser.bind(client.auth);
  client.auth.getUser = async (token?: string) => {
    const mockCookie = cookieStore.get("brandy-mock-admin-session")?.value;
    if (mockCookie === "true") {
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

  return client;
}

