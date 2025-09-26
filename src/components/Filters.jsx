export default function Filters({ type, year, onType, onYear, onReset }) {
  const TYPES = [
    { value: 'all',    label: 'All' },
    { value: 'movie',  label: 'Movie' },
    { value: 'series', label: 'Series' },
    { value: 'episode',label: 'Episode' },
    { value: 'game',   label: 'Game' },
  ];
  const currentYear = new Date().getFullYear();

  const handleYearChange = (e) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 4); // chiffres, 4 max
    onYear(v);
  };

  const clampOnBlur = () => {
    if (!year) return;
    const n = parseInt(year, 10);
    if (isNaN(n) || n < 1900 || n > currentYear) onYear('');
    else onYear(String(n));
  };

  const clearYear = () => onYear('');

  return (
    <fieldset className="filter-toolbar">
      <legend className="sr-only">Filters</legend>

      <div className="segmented" role="tablist" aria-label="Type">
        {TYPES.map(t => (
          <button
            key={t.value}
            type="button"
            className={`segmented-item${type === t.value ? ' is-active' : ''}`}
            aria-pressed={type === t.value}
            onClick={() => onType(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="year-field">
        <label htmlFor="year" className="filter-label">Year</label>
        <div className="year-input">
          <input
            id="year"
            inputMode="numeric"
            pattern="\d{4}"
            maxLength={4}
            placeholder="e.g. 2012"
            value={year}
            onChange={handleYearChange}
            onBlur={clampOnBlur}
            aria-label="Filter by year (4 digits)"
          />
          {year && (
            <button type="button" className="clear-year" onClick={clearYear} aria-label="Clear year">×</button>
          )}
        </div>
        <small className="hint">1900–{currentYear}</small>
      </div>

      <button
        type="button"
        className="reset-filters"
        onClick={() => { onType('all'); onYear(''); onReset && onReset(); }}
        aria-label="Reset filters"
      >
        Reset
      </button>
    </fieldset>
  );
}
