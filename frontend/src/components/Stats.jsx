import profile from "../assets/profile.jpg";

const Stats = (props) => {
  const { email, name, changeName, setChangeName } = props || {};
  return (
    <div className="stats shadow bg-base-200">
      <div className="stat p-12">
        <div className="stat-figure text-secondary px-20 py-4 place-self-start">
          <div className="avatar online">
            <div className="w-16 rounded-full overflow-hidden transition-all ease-in-out duration-300 origin-bottom">
              <img
                src={profile}
                className="cursor-pointer hover:scale-[1.04]"
              />
            </div>
          </div>
        </div>
        <div className="py-4">
          <div className="stat-value">Email</div>
          <div className="stat-title font-bold text-purple-600">{email}</div>
        </div>
        <div className="py-4">
          <div className="stat-value">Name</div>
          <div className="stat-title font-bold text-pink-500">{name}</div>
        </div>
        <div className="flex">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              checked={changeName}
              className="checkbox checkbox-primary me-4"
              onChange={(e) => setChangeName(e.target.checked)}
            />
            <span className="label-text text-sm">Change Username?</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Stats;
