import {
  Page,
  Text,
  View,
  Document,
  Image,
  Font,
  Link,
} from "@react-pdf/renderer";
import { formatDate } from "~/lib/utils/format-date";
import { formatName } from "~/lib/utils/format-name";
import cestari from "./assets/cestari.png";
import icaro from "./assets/icaro.png";
import type {
  CertificateMetadata,
  ChallengeUserMetadata,
  WorkshopUserMetadata,
} from "~/lib/models/certificates.server";
import type { ChallengeUser } from "~/lib/models/user.server";
import type { WorkshopUser } from "~/lib/models/workshop.server";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Regular.ttf" }, // font-style: normal, font-weight: normal
    { src: "/fonts/Roboto-Light.ttf", fontWeight: "light" },
    { src: "/fonts/Roboto-Medium.ttf", fontWeight: "medium" },
  ],
});

export default function CertificatePDF({
  username,
  metadata,
  certifiableType,
  certifiable,
  validationLink,
  createdAt,
  id,
}: {
  username: string;
  certifiableType: "ChallengeUser" | "WorkshopUser";
  validationLink: string;
  createdAt: string;
  metadata: CertificateMetadata;
  certifiable: ChallengeUser | WorkshopUser;
  id: string;
}) {
  function formatTime(time: string) {
    let seconds = Math.ceil(Number(time));

    // Converte os segundos em horas e minutos
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);

    // Retorna o tempo formatado
    return `${hours} horas e ${minutes} minutos`;
  }
  if (certifiableType === "ChallengeUser") {
    return (
      <Document>
        <Page
          orientation="landscape"
          size="A4"
          style={{ fontFamily: "Roboto" }}
        >
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
                    marginLeft: "-4.5px",
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
                  <Text style={{ fontSize: "14px", marginVertical: "15px" }}>
                    {`O Projeto `}
                    <Text
                      style={{
                        fontSize: "14px",
                        fontWeight: "medium",
                        textTransform: "uppercase",
                      }}
                    >
                      {metadata.certifiable_source_name}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontSize: "12px",
                      maxWidth: "55%",
                      lineHeight: "1.5",
                    }}
                  >
                    {`oferecido e organizado pela CODANTE EDUCAÇÃO LTDA (Codante.io)
                  na modalidade online. A submissão final do projeto ocorreu em `}
                  </Text>
                  <Text
                    style={{
                      fontSize: "12px",
                      maxWidth: "55%",
                      lineHeight: "1.5",
                      marginBottom: "15px",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "medium",
                      }}
                    >
                      {formatDate((metadata as ChallengeUserMetadata).end_date)}
                    </Text>
                    {` e os principais conteúdos abordados nesse projeto foram:`}
                  </Text>
                  {(metadata as ChallengeUserMetadata).tags.map((tag) => (
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
                    <Link
                      src={(certifiable as ChallengeUser).submission_url}
                      style={{ fontSize: "8px", color: "#666666" }}
                    >
                      Link da submissão:
                    </Link>
                    <Image
                      style={{ width: "75px", height: "auto" }}
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${
                        (certifiable as ChallengeUser).submission_url
                      }`}
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
                    <Link
                      src={validationLink}
                      style={{ fontSize: "8px", color: "#666666" }}
                    >
                      Link de validação:
                    </Link>
                    <Image
                      style={{ width: "75px", height: "auto" }}
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${validationLink}`}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "10px",
                  marginTop: "100px",
                  gap: "125px",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "150px",
                  }}
                >
                  <Image
                    style={{
                      marginBottom: "-20px",
                      width: "145px",
                      height: "auto",
                    }}
                    src={icaro}
                  />
                  <Text style={{ fontWeight: "medium", textAlign: "center" }}>
                    Prof. Ícaro Pinto Coelho Harry
                  </Text>
                  <Text style={{ textAlign: "center" }}>
                    Coordenador e Diretor Acadêmico do Codante.io
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "150px",
                  }}
                >
                  <Image style={{ marginBottom: "-20px" }} src={cestari} />
                  <Text style={{ fontWeight: "medium", textAlign: "center" }}>
                    Prof. Roberto Tagliari Cestari
                  </Text>
                  <Text style={{ textAlign: "center" }}>
                    Coordenador e Diretor Acadêmico do Codante.io
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "8px",
                marginTop: "-25px",
                marginBottom: "15px",
              }}
            >
              <Text>{`Certificado emitido em: ${formatDate(createdAt)}`} </Text>
              <Text>
                {`Código de validação: `}
                <Text style={{ fontWeight: "medium" }}>{id}</Text>
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  }

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
                  marginLeft: "-4.5px",
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
                <Text style={{ fontSize: "11px" }}>participou e completou</Text>
                <Text style={{ fontSize: "14px", marginVertical: "15px" }}>
                  {`O Workshop `}
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: "medium",
                      textTransform: "uppercase",
                    }}
                  >
                    {metadata.certifiable_source_name}
                  </Text>
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                    maxWidth: "55%",
                    lineHeight: "1.5",
                  }}
                >
                  {`oferecido e organizado pela CODANTE EDUCAÇÃO LTDA (Codante.io)
              na modalidade online. O Workshop foi finalizado em`}
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                    maxWidth: "55%",
                    lineHeight: "1.5",
                    marginBottom: "15px",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "medium",
                    }}
                  >
                    {formatDate((metadata as WorkshopUserMetadata).end_date)}
                  </Text>
                  {` com tempo de duração total de `}
                  <Text
                    style={{
                      fontWeight: "medium",
                    }}
                  >{`${formatTime(
                    (metadata as WorkshopUserMetadata).duration_in_seconds,
                  )}.`}</Text>
                </Text>
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
                  <Link
                    src={`https://codante.io/workshops/${metadata.certifiable_slug}`}
                    style={{ fontSize: "8px", color: "#666666" }}
                  >
                    Link do workshop:
                  </Link>
                  <Image
                    style={{ width: "75px", height: "auto" }}
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=codante.io/workshops/${metadata.certifiable_slug}`}
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
                  <Link
                    src={validationLink}
                    style={{ fontSize: "8px", color: "#666666" }}
                  >
                    Link de validação:
                  </Link>
                  <Image
                    style={{ width: "75px", height: "auto" }}
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${validationLink}`}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                fontSize: "10px",
                marginTop: "100px",
                gap: "125px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "150px",
                }}
              >
                <Image
                  style={{
                    marginBottom: "-20px",
                    width: "145px",
                    height: "auto",
                  }}
                  src={icaro}
                />
                <Text style={{ fontWeight: "medium", textAlign: "center" }}>
                  Prof. Ícaro Pinto Coelho Harry
                </Text>
                <Text style={{ textAlign: "center" }}>
                  Coordenador e Diretor Acadêmico do Codante.io
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "150px",
                }}
              >
                <Image style={{ marginBottom: "-20px" }} src={cestari} />
                <Text style={{ fontWeight: "medium", textAlign: "center" }}>
                  Prof. Roberto Tagliari Cestari
                </Text>
                <Text style={{ textAlign: "center" }}>
                  Coordenador e Diretor Acadêmico do Codante.io
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "8px",
              marginTop: "-25px",
              marginBottom: "15px",
            }}
          >
            <Text>{`Certificado emitido em: ${formatDate(createdAt)}`} </Text>
            <Text>
              {`Código de validação: `}
              <Text style={{ fontWeight: "medium" }}>{id}</Text>
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
