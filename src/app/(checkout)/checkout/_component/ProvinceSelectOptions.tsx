const provinces = [
  { label: "Phnom Penh", value: "phnom_penh" },
  { label: "Banteay Meanchey", value: "banteay_meanchey" },
  { label: "Battambang", value: "battambang" },
  { label: "Kampong Cham", value: "kampong_cham" },
  { label: "Kampong Chhnang", value: "kampong_chhnang" },
  { label: "Kampong Speu", value: "kampong_speu" },
  { label: "Kampong Thom", value: "kampong_thom" },
  { label: "Kampot", value: "kampot" },
  { label: "Kandal", value: "kandal" },
  { label: "Kep", value: "kep" },
  { label: "Koh Kong", value: "koh_kong" },
  { label: "Kratie", value: "kratie" },
  { label: "Mondulkiri", value: "mondulkiri" },
  { label: "Oddar Meanchey", value: "oddar_meanchey" },
  { label: "Pailin", value: "pailin" },
  { label: "Preah Sihanouk", value: "preah_sihanouk" },
  { label: "Preah Vihear", value: "preah_vihear" },
  { label: "Pursat", value: "pursat" },
  { label: "Ratanakiri", value: "ratanakiri" },
  { label: "Siem Reap", value: "siem_reap" },
  { label: "Prey Veng", value: "prey_veng" },
  { label: "Stung Treng", value: "stung_treng" },
  { label: "Svay Rieng", value: "svay_rieng" },
  { label: "Takeo", value: "takeo" },
  { label: "Tboung Khmum", value: "tboung_khmum" },
];

const ProvinceSelectOptions = ({
  onSelect,
  selected,
}: {
  onSelect: (province: string) => void;
  selected: string;
}) => {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <label
          htmlFor="select-province-input"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Province*
        </label>
      </div>
      <select
        id="select-province-input"
        value={selected}
        name="province"
        onChange={(e) => onSelect(e.target.value)}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-8 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
      >
        {provinces.map((province) => (
          <option key={province.value} value={province.value}>
            {province.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProvinceSelectOptions;
