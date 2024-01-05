import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  sectionBorder: {
    width: "100%",
    height: "50%",
    border: "1px solid black",
    backgroundColor: "#5282FF",
    position: "relative",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    // zIndex: -1,
  },
  logoImage: {
    width: "100px",
    margin: "5px",
  },
  section2: {
    height: "100%",
    margin: "16px",
    backgroundColor: "white",
  }
});

// Create Document Component
export default function CertificatePDF({username, date, tags, title} :
  {
    username: string;
    date: string;
    tags: string[];
    title: string;
  }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.sectionBorder}>
          <Image src="/img/logobackground.png" style={styles.bgImage}/>
          <View style={styles.section2}>
            <Image src="/img/codante-certificado-logo.png" style={styles.logoImage} />
            <Text>
              {username}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}