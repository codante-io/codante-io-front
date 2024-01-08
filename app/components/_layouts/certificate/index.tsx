import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Alex Brush',
  src: "/fonts/alexbrush-cursive.ttf",
  fontStyle: 'normal',
  fontWeight: 'normal',
});

Font.register({
  family: 'Roboto Condensed',
  src: "/fonts/roboto-condensed.ttf",
  fontStyle: 'normal',
  fontWeight: 'normal',
});

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
  main: {
    height: "100%",
    margin: "16px",
    backgroundColor: "white",
  },
  title: {
    marginTop: "16px",
    textAlign: "center",
    fontSize: "38px",
    // fontWeight: "semibold",
    fontFamily: "Alex Brush",
  },
  text: {
    textAlign: "left",
    marginLeft: "16px",
    marginRight: "16px",
    fontSize: "14px",
    marginTop: "16px",
  },
  username: {
    textAlign: "center",
    fontSize: "18px",
    fontFamily: "Roboto Condensed",
    textTransform: "uppercase",
    marginTop: "16px",
  },
  firstBox: {
    textAlign: "center",
    borderBottom: "1px solid black",
    width: "50%",
    margin: "0 auto",
    marginTop: "5px",
  },
  content: {
    display: "flex",
    flexDirection: "row",
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

  function formatDate(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  return (
    <Document>
      <Page orientation="landscape" size="A4" style={styles.page}>
        <View style={styles.sectionBorder}>
          <Image src="/img/logobackground.png" style={styles.bgImage}/>
          <View style={styles.main}>
            <Image src="/img/codante-certificado-logo.png" style={styles.logoImage} />
            <Text style={styles.title}>
              Certificado de conclusão
            </Text>
            <Text style={styles.text}>
              Certificamos que
            </Text>
            <View style={styles.firstBox}>
              <Text style={styles.username}>
                {username}
              </Text>
            </View>
            <View style={{fontSize: "14px", display: "flex", flexDirection: "row", marginHorizontal: "16px", marginTop: "20px"}}>
              <Text>
                Em{' '}
              </Text>
              <Text style={{fontWeight: "bold"}}>
                {formatDate(date)}{' '}
              </Text>
              <Text>
               completou o Projeto{' '}
              </Text>
              <Text style={{color: "#5282FF"}}>
                {title}{' '}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}