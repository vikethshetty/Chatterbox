const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => (
  <fieldset>
    <legend className="auth-label">Gender</legend>
    <div className="grid grid-cols-2 gap-3">
      {["male", "female"].map((gender) => {
        const selected = selectedGender === gender;
        return (
          <label
            key={gender}
            className={`flex min-h-[46px] cursor-pointer items-center gap-2.5 rounded-[10px] border px-3.5 text-sm capitalize transition ${selected ? "border-[#565449] bg-[#ece6d8] text-[#11120D]" : "border-[#c9c1b1] bg-[#FFFBF4] text-[#565449] hover:border-[#8e8b7e]"}`}
          >
            <input
              type="radio"
              name="gender"
              value={gender}
              className="h-4 w-4 accent-[#565449]"
              checked={selected}
              onChange={() => onCheckboxChange(gender)}
              required
            />
            {gender}
          </label>
        );
      })}
    </div>
  </fieldset>
);

export default GenderCheckbox;
