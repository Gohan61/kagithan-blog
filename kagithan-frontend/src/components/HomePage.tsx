export function HomePage() {
  return (
    <div className="flex flex-col gap-2 w-[300px] md:w-[600px] ml-auto mr-auto leading-relaxed">
      <h2 className="text-3xl font-bold">Welcome to the Kagithan blog</h2>

      <section>
        <h3 className="text-lg font-semibold mb-2">About me</h3>

        <p className="mb-2">
          I am Gökhan, an avid reader of historical romance, self-help and
          programming books. For a couple of years now I have been teaching
          myself programming. It first started with some Data Science courses
          and Python. However, after finishing these courses I didn't really
          feel like this was what I wanted to move forward in. Partly it was the
          math involved and also the complexity. It didn't feel like at the
          time, that there were enough freely available resources to become a
          data scientist. Noting that I did need this as I couldn't keep on
          paying for expensive courses.
        </p>

        <p>
          However, I did really like programming and wanted to make a career in
          this field. So I started my search online and quickly discovered that
          there were many freely available resources on web development. Since
          then I have thought myself full-stack web development and successfully
          finished several full-stack projects.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Purpose</h3>

        <p className="mb-2">
          Over the years I have been annotating and making summaries of some of
          the books I read. Especially, in the self-help category. Over time the
          feeling of sharing my take on these books grew stronger. I started
          leaving reviews on Goodreads on some of these books. Even though it
          was a nice way to engage with others and share our thoughts on these
          books, it didn't encompass what I really wanted. Rather than a review,
          I wanted to highlight how I implemented some principles in these books
          and/or share the connections I made by writing down things in my
          summaries.
        </p>

        <p>
          As someone who doesn't use social media (depends if you count
          Goodreads) and doesn't really like short-form content, I decided that
          a blog could fit my needs. These blogs will focus on my journey so far
          and as I mentioned, my takes on the books I read. For the future, I am
          also planning to record some videos in which I will try to visualize
          some of these blogs and talk about them. You are free to contact me in
          case you want to talk on some of the topics in these blogs.
        </p>
      </section>
    </div>
  );
}
