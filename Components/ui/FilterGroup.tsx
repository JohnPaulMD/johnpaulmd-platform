import FilterButton from "./FilterButton";

type Props = {
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

export default function FilterGroup({
  title,
  options,
  selected,
  onSelect,
}: Props) {
  return (
    <div>

      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">

        {options.map((option) => (
          <FilterButton
            key={option}
            active={selected === option}
            onClick={() => onSelect(option)}
          >
            {option}
          </FilterButton>
        ))}

      </div>

    </div>
  );
}