# SEO and content operations

## Environment

Set `NEXT_PUBLIC_SITE_URL` to `https://www.doitnikhil.in`, matching the current production redirect from the bare domain. The code uses this as its fallback too. Keep the same value across robots, canonical URLs and social metadata. The current bare-domain redirect is HTTP 307; configure a permanent redirect (308 or 301) in the hosting dashboard if this is the intended long-term primary domain.

The blog requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` locally and in production. Use the public anon key; never use a service-role key for public reads. Published queries use the anonymous client and explicitly filter `published = true`. Keep Supabase RLS enabled and allow anonymous reads only for published posts and approved comments.

Optional: set `GOOGLE_SITE_VERIFICATION` to the **content value** from Search Console's HTML meta-tag verification method, then redeploy. For a Domain property, add Google's TXT record through the domain's DNS dashboard instead.

## Content caching

Published posts and categories use a 60-second shared server data cache. Metadata and article rendering share a request-memoized post read. Comments and authenticated admin reads remain uncached. Publishing, edits and unpublishing can take about a minute to reach readers; a stale entry may be served while the next request revalidates it. Failed database queries throw instead of caching an empty blog or false 404.

The sitemap uses actual post modification dates. If the content database is unavailable, core portfolio URLs remain available; article URLs return after recovery and revalidation.

New images inserted with the editor toolbar record natural dimensions when the image loads and use lazy loading. Existing article images need to be resaved with correct width and height attributes to reserve their aspect ratio. Do not guess dimensions.

## After deployment

1. Verify ownership in Google Search Console and submit `/sitemap.xml`.
2. Inspect the homepage, `/posts`, one published article and `/work/anviora` in URL Inspection. Confirm their selected canonical URLs.
3. Check the article share preview with and without a featured image.
4. Run PageSpeed Insights on the homepage and a published article on mobile. Use Speed Insights and Search Console for real visitor data; do not interpret a successful build as a performance score.
5. Review impressions, clicks and relevant search queries after there is enough data. Use those to choose useful follow-up articles.

AdSense setup is separate. No ads, tracking changes or consent tooling have been added by this optimization pass.
