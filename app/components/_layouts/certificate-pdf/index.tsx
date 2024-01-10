import { Page, Text, View, Document, Image, Font } from "@react-pdf/renderer";
import { formatDate } from "~/lib/utils/format-date";

Font.register({
  family: "Alex Brush",
  src: "/fonts/alexbrush-cursive.ttf",
  fontStyle: "normal",
  fontWeight: "normal",
});

Font.register({
  family: "Roboto Condensed",
  src: "/fonts/roboto-condensed.ttf",
  fontStyle: "normal",
  fontWeight: "normal",
});

Font.register({
  family: "Istok Web",
  fonts: [
    { src: "/fonts/IstokWeb-Regular.ttf" }, // font-style: normal, font-weight: normal
    { src: "/fonts/IstokWeb-Bold.ttf", fontWeight: "bold" },
  ],
});

Font.register({
  family: "Rubik",
  src: "/fonts/rubik-regular.ttf",
  fontStyle: "normal",
  fontWeight: "normal",
});

// Create Document Component
export default function CertificatePDF({
  username,
  date,
  tags,
  title,
}: {
  username: string;
  date: string;
  tags: string[];
  title: string;
}) {
  return (
    <Document>
      <Page
        orientation="landscape"
        size="A4"
        style={{ fontFamily: "Istok Web" }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid black",
            backgroundColor: "#1E2B38",
            position: "relative",
          }}
        >
          <Image
            src="/img/logobackground.png"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          />
          <View
            style={{
              height: "100%",
              margin: "25px",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          >
            <Image
              src="/img/codante-certificado-logo.png"
              style={{
                width: "150px",
                height: "auto",
                margin: "10px",
              }}
            />
            <Text
              style={{
                marginTop: "20px",
                textAlign: "center",
                fontSize: "48px",
                fontFamily: "Alex Brush",
              }}
            >
              Certificado de conclusão
            </Text>
            <Text
              style={{
                textAlign: "left",
                marginHorizontal: "20px",
                fontSize: "14px",
                marginTop: "40px",
              }}
            >
              O presente certificado é conferido a
            </Text>
            <View
              style={{
                textAlign: "center",
                borderBottom: "1px solid black",
                width: "50%",
                margin: "0 auto",
                marginVertical: "20px",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  fontFamily: "Roboto Condensed",
                  textTransform: "uppercase",
                  marginTop: "16px",
                }}
              >
                {username}
              </Text>
            </View>
            <View
              style={{
                fontSize: "14px",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                marginHorizontal: "20px",
                marginTop: "20px",
                lineHeight: "2",
              }}
            >
              <Text>Em reconhecimento pela conclusão </Text>
              <Text>do projeto </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#5282FF",
                }}
              >
                {title}{" "}
              </Text>
              <Text>que abordou, </Text>
              <Text>de forma prática, </Text>
              <Text>
                {tags.length > 1 ? "as tecnologias " : "a tecnologia "}
              </Text>
              {tags.map((tag, index) => (
                <Text key={index} style={{ fontWeight: "semibold" }}>
                  {tag}
                  {index === tags.length - 2
                    ? " e "
                    : index < tags.length - 1
                    ? ", "
                    : "."}
                </Text>
              ))}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: "100px",
                marginTop: "100px",
              }}
            >
              <View
                style={{
                  borderTop: "1px solid black",
                  width: "200px",
                  textAlign: "center",
                  fontFamily: "Rubik",
                  fontSize: "12px",
                  paddingTop: "10px",
                }}
              >
                <Text>Icaro Harry</Text>
              </View>
              <View
                style={{
                  borderTop: "1px solid black",
                  width: "200px",
                  textAlign: "center",
                  fontFamily: "Rubik",
                  fontSize: "12px",
                  paddingTop: "10px",
                }}
              >
                <Text>Roberto Cestari</Text>
              </View>
            </View>
            <Text
              style={{
                textAlign: "center",
                marginTop: "50px",
                fontSize: "12px",
              }}
            >
              {formatDate(date)}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
