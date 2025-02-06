import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:"skAg70vAMVKfYZot8o31IbyM6Bkcr2kXbHpLnZmm10hF8aSGavZzXHnlHFBZR2eA3DsQUQVUdIEIwVAuyCpnHqNILJRRlo1zZbEmoc9kXkcbDPYLR3UaB6yFpv89KfRM6fDeSILR2Rywscn2KRNrbkaTx7rkjvQbmb3q4rG3jgYxLIfkdLnd"
})
