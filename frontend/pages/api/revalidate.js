export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  if (req.query.secret !== 'KIGOz3d9H31FGDD3klts0qhRqfq') {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    // await res.revalidate('/news');
    
    console.log('revalidation can be successful!');

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
};

// KIG+Oz3d9H31FGDD3klts0qhRqfqA2KAlLs1EmExnc9susHf/1upZds4I+CS6++B
// 7n+qwbazt7kLXM6Vf6LNfg

// https://bananasite.ru/api/revalidate?secret=KIGOz3d9H31FGDD3klts0qhRqfq
