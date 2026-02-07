import { colors } from "../styles/theme";

function PageBanner({ title, subtitle }) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, #ffffff 0%, ${colors.primary} 100%)`,
        color: colors.white,
        width: "90%",
        maxWidth: "1100px",
        margin: "20px auto 30px",
        padding: "22px 30px",
        borderRadius: "12px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: "0.5px",
            fontFamily: '"Georgia", "Garamond", serif',
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            style={{
              margin: 0,
              fontSize: 15,
              opacity: 0.9,
              fontWeight: 400,
              fontFamily: '"Segoe UI", Roboto, sans-serif',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default PageBanner;
