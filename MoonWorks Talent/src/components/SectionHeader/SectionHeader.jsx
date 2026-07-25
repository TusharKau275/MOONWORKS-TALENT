import './SectionHeader.css';

const SectionHeader = ({ eyebrow, title, subtitle, dark = false, tealEyebrow = false }) => {
  return (
    <div className="section-header text-center">
      {eyebrow && (
        <span className={`eyebrow ${tealEyebrow ? 'eyebrow--teal' : ''}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`section-header__title ${dark ? 'section-header__title--dark' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="section-header__subtitle">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeader;
