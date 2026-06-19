// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_URL;

// interface FetchOptions {
//   revalidate?: number;
// }

// export async function serverFetch<T>(
//   endpoint: string,
//   options?: FetchOptions
// ): Promise<T> {
//   const response = await fetch(
//     `${API_BASE_URL}${endpoint}`,
//     {
//       next: {
//         revalidate: options?.revalidate ?? 3600,
//       },
//       headers: {
//         Accept: "application/json",
//       },
//     }
//   );




//   if (!response.ok) {
//     throw new Error(
//       `API Error: ${response.status}`
//     );
//   }

//   return response.json();
// }

// //Subject API
// export async function fetchSubjectBySlug(
//   slug: string
// ) {
//   const res = await fetch(
//     `${API_BASE_URL}/academics/subjects/${slug}/`,
//     {
//       next: {
//         revalidate: 60, // caching
//       },
//     }
//   );

//   if (!res.ok) {
//     throw new Error(
//       `Failed to fetch subject: ${res.status}`
//     );
//   }

//   return res.json();
// }