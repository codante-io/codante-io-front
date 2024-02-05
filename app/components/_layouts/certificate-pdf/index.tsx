import { Page, Text, View, Document, Image, Font } from "@react-pdf/renderer";
import { formatDate } from "~/lib/utils/format-date";
import { formatName } from "~/lib/utils/format-name";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Regular.ttf" }, // font-style: normal, font-weight: normal
    { src: "/fonts/Roboto-Light.ttf", fontWeight: "light" },
    { src: "/fonts/Roboto-Medium.ttf", fontWeight: "medium" },
  ],
});

// Create Document Component
export default function CertificatePDF({
  username,
  date,
  tags,
  title,
  validationLink,
  submissionLink,
}: {
  username: string;
  date: string;
  tags: string[];
  title: string;
  validationLink: string;
  submissionLink: string;
}) {
  return (
    <Document>
      <Page orientation="landscape" size="A4" style={{ fontFamily: "Roboto" }}>
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            color: "#666666",
          }}
        >
          <View
            style={{
              height: "100%",
              margin: "35px",
              backgroundColor: "white",
              border: "2px solid #D6D6D6",
              padding: "35px",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginBottom: "15px",
              }}
            >
              <Text
                style={{
                  fontSize: "52px",
                  fontWeight: "light",
                }}
              >
                Certificado
              </Text>
              <Image
                src="/img/codante-certificado-logo.png"
                style={{
                  width: "172px",
                  height: "auto",
                }}
              />
            </View>
            <View
              style={{
                marginTop: "20px",
                justifyContent: "space-between",
                alignItems: "flex-start",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View>
                <Text style={{ fontSize: "11px" }}>Certificamos que</Text>
                <Text
                  style={{
                    fontSize: "24px",
                    fontWeight: "medium",
                    marginVertical: "8px",
                  }}
                >
                  {formatName(username)}
                </Text>
                <Text style={{ fontSize: "11px" }}>
                  participou, completou e submeteu
                </Text>
                <Text style={{ fontSize: "14px", marginVertical: "5px" }}>
                  {`O Projeto `}
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: "medium",
                      textTransform: "uppercase",
                    }}
                  >
                    {title}
                  </Text>
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                    maxWidth: "55%",
                    marginBottom: "10px",
                  }}
                >
                  {`oferecido e organizado pela CODANTE EDUCAÇÃO LTDA (Codante.io)
                  na modalidade online. A submissão final do projeto ocorreu em ${formatDate(
                    date,
                  )} e os principais conteúdos abordados nesse projeto foram:`}
                </Text>
                {tags.map((tag) => (
                  <View
                    key={tag}
                    style={{
                      flexDirection: "row",
                      fontSize: "12px",
                      fontWeight: "medium",
                    }}
                  >
                    <Text style={{ marginRight: 8 }}>•</Text>
                    <Text>{tag}</Text>
                  </View>
                ))}
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    gap: "5px",
                  }}
                >
                  <Text style={{ fontSize: "8px" }}>Link da submissão:</Text>
                  <Image
                    style={{ width: "75px", height: "auto" }}
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${submissionLink}`}
                  />
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    gap: "5px",
                  }}
                >
                  <Text style={{ fontSize: "8px" }}>Link de validação</Text>
                  <Image
                    style={{ width: "75px", height: "auto" }}
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${validationLink}`}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
