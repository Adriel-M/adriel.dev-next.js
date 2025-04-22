import { Provider } from '@/components/posthog/Provider'

const isProduction = process.env.NODE_ENV === 'production'

const posthogApiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY

const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

const PostHogProvider = ({ children }: { children: React.ReactNode }) => {
  if (!isProduction || !posthogApiKey || !posthogHost) {
    return <>{children}</>
  }

  return <Provider>{children}</Provider>
}

export default PostHogProvider
