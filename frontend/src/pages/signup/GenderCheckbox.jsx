const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => (
  <fieldset>
    <legend className="mb-1.5 text-xs font-semibold tracking-wide text-slate-300">GENDER</legend>
    <div className="flex gap-3">
      {["male", "female"].map((gender) => (
        <label
          key={gender}
          className={`flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm capitalize transition ${
            selectedGender === gender
              ? "border-cyan-300/50 bg-cyan-300/10 text-white shadow-[inset_0_0_0_1px_rgba(103,232,249,0.08)]"
              : "border-white/10 bg-slate-900/70 text-slate-300 hover:border-white/25"
          }`}
        >
          <input
            type="radio"
            name="gender"
            value={gender}
            className="h-4 w-4 accent-cyan-400"
            checked={selectedGender === gender}
            onChange={() => onCheckboxChange(gender)}
          />
          {gender}
        </label>
      ))}
    </div>
  </fieldset>
);

export default GenderCheckbox;
