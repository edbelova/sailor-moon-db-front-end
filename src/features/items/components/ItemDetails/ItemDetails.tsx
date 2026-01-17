import styles from './ItemDetails.module.css'

type Props = {
  name: string;
  characters?: string[];
  releaseDate?: string;
  manufacturer?: string;
  materials?: string[];
  series?: string;
  price?: number;
  dimentions?: string;
  country?: string;
};

type RowProps = {
  label: string;
  children?: React.ReactNode;
};

function Row({ label, children }: RowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{children ?? <span className={styles.empty}>—</span>}</div>
    </div>
  );
}

export function ItemDetails({
  name,
  characters,
  releaseDate,
  manufacturer,
  materials,
  series,
  price,
  dimentions,
  country,
}: Props) {
  return (
    <section className={styles.card} aria-label="Item details">
      <Row label="Name">{name}</Row>

      <Row label="Characters">
        {characters && characters.length > 0
          ? characters.map((c) => (
              <a key={c} href="#" className={styles.linkLike}>
                {c}
              </a>
            ))
          : null}
      </Row>

      <Row label="Release Date">{releaseDate}</Row>

      <Row label="Manufacturer">
        {manufacturer ? (
          <a href="#" className={styles.linkLike}>
            {manufacturer}
          </a>
        ) : null}
      </Row>

      <Row label="Materials">{materials?.join(", ")}</Row>

      <Row label="Series">
        {series ? (
          <a href="#" className={styles.linkLike}>
            {series}
          </a>
        ) : null}
      </Row>

      <Row label="Manufacturer price">
        {typeof price === "number" ? `${price}Y` : null}
      </Row>

      <Row label="Dimentions">{dimentions}</Row>

      <Row label="Country">
        {country ? (
          <a href="#" className={styles.linkLike}>
            {country}
          </a>
        ) : null}
      </Row>
    </section>
  );
}