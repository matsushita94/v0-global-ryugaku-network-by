import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

function parseAdminEmails(value: string | undefined) {
  if (!value) {
    return []
  }

  return value
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
          })

          response = NextResponse.next({
            request,
          })

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const isAdminRoute = pathname.startsWith("/admin")
  const isAdminLoginRoute = pathname === "/admin/login"
  const adminEmails = parseAdminEmails(process.env.ADMIN_EMAILS)

  const isAllowedAdmin =
    !!user &&
    (adminEmails.length === 0 ||
      adminEmails.includes((user.email ?? "").toLowerCase()))

  if (isAdminRoute && !isAdminLoginRoute && !isAllowedAdmin) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = "/admin/login"
    redirectUrl.searchParams.set("next", pathname)

    return NextResponse.redirect(redirectUrl)
  }

  if (isAdminLoginRoute && isAllowedAdmin) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = "/admin"
    redirectUrl.search = ""

    return NextResponse.redirect(redirectUrl)
  }

  return response
}
