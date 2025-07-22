import MessageList from "../components/MessageList";

const Home = () => (
  <div className="grid grow grid-cols-4">
    <aside className="overflow-y-auto border-r-1 border-[var(--accent-color)]">
      <ul className="flex h-full flex-col">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <li key={index} className="p-2">
              <MessageList />
            </li>
          ))}
      </ul>
    </aside>
    <div className="col-span-3 bg-[var(--secondary-color)] p-4">
      <div className="flex h-full w-full flex-col rounded-md bg-[var(--primary-color)]">
        <div className="h-18 border-b-1 border-[var(--accent-color)] p-4">
          <p className="text-2xl">Name</p>
        </div>
        <div className="flex grow flex-col gap-4 overflow-y-auto p-4">
          <div>
            <div className="float-left max-w-2xl rounded-2xl bg-[var(--tertiary-color)] p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem, sunt ex ad quasi voluptates ipsa blanditiis assumenda,
              natus corporis dolorum ullam nulla, voluptate quibusdam a ipsam.
              Temporibus animi soluta dolor.
            </div>
          </div>
          <div>
            <div
              className={`
                float-right max-w-2xl rounded-2xl bg-[var(--accent-color)] p-4
                selection:bg-[var(--accent-hover-color)]
              `}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Necessitatibus rem nisi quo architecto ad! Doloremque molestiae
              minus vel illum aperiam inventore. Vel veniam nobis est ratione
              quaerat aperiam quae ex?
            </div>
          </div>
          <div>
            <div
              className={`
                float-right max-w-2xl rounded-2xl bg-[var(--accent-color)] p-4
                selection:bg-[var(--accent-hover-color)]
              `}
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Necessitatibus rem nisi quo architecto ad! Doloremque molestiae
              minus vel illum aperiam inventore. Vel veniam nobis est ratione
              quaerat aperiam quae ex?
            </div>
          </div>
        </div>
        <div className="flex h-18 gap-4 border-t-1 border-[var(--accent-color)] p-4">
          <input
            type="text"
            className={`
              block h-full grow rounded-2xl bg-[var(--tertiary-color)] px-4 text-sm/6
              focus:outline-2 focus:outline-[var(--accent-color)]
            `}
          />
          <button
            className={`
              cursor-pointer rounded-2xl bg-[var(--accent-color)] px-4
              hover:bg-[var(--accent-hover-color)]
            `}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
