<<<<<<< HEAD
import React from 'react';

interface IkanProps {
  ikan: {
    nama: string;
    gambar: string;
    deskripsi: string;
    kerajaan: string;
    filum: string;
    kelas: string;
    ordo: string;
    famili: string;
    genus: string;
    spesies: string;
  };
}

const IkanDetail: React.FC<IkanProps> = ({ ikan }) => {
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.h1}>{ikan.nama}</h1>
        <img style={styles.img} src={ikan.gambar} alt={ikan.nama} />
        <p style={styles.p}>{ikan.deskripsi}</p>
        <div style={styles.info}>
          <p style={styles.p}><strong style={styles.strong}>Kerajaan:</strong> {ikan.kerajaan}</p>
          <p style={styles.p}><strong style={styles.strong}>Filum:</strong> {ikan.filum}</p>
          <p style={styles.p}><strong style={styles.strong}>Kelas:</strong> {ikan.kelas}</p>
          <p style={styles.p}><strong style={styles.strong}>Ordo:</strong> {ikan.ordo}</p>
          <p style={styles.p}><strong style={styles.strong}>Famili:</strong> {ikan.famili}</p>
          <p style={styles.p}><strong style={styles.strong}>Genus:</strong> {ikan.genus}</p>
          <p style={styles.p}><strong style={styles.strong}>Spesies:</strong> {ikan.spesies}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    backgroundColor: '#f0f8ff',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column' as 'column',
    minHeight: '100vh',

  },
  h1: {
    color: '#2c3e50',
    marginBottom: '20px',
  },
  img: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  p: {
    color: '#34495e',
    margin: '5px 0',
  },
  container: {
    maxWidth: '800px',
    width: '100%',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  info: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
  },
  strong: {
    color: '#2980b9',
  },
};

export default IkanDetail;
=======
import React from 'react';

interface IkanProps {
  ikan: {
    nama: string;
    gambar: string;
    deskripsi: string;
    kerajaan: string;
    filum: string;
    kelas: string;
    ordo: string;
    famili: string;
    genus: string;
    spesies: string;
  };
}

const IkanDetail: React.FC<IkanProps> = ({ ikan }) => {
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.h1}>{ikan.nama}</h1>
        <img style={styles.img} src={ikan.gambar} alt={ikan.nama} />
        <p style={styles.p}>{ikan.deskripsi}</p>
        <div style={styles.info}>
          <p style={styles.p}><strong style={styles.strong}>Kerajaan:</strong> {ikan.kerajaan}</p>
          <p style={styles.p}><strong style={styles.strong}>Filum:</strong> {ikan.filum}</p>
          <p style={styles.p}><strong style={styles.strong}>Kelas:</strong> {ikan.kelas}</p>
          <p style={styles.p}><strong style={styles.strong}>Ordo:</strong> {ikan.ordo}</p>
          <p style={styles.p}><strong style={styles.strong}>Famili:</strong> {ikan.famili}</p>
          <p style={styles.p}><strong style={styles.strong}>Genus:</strong> {ikan.genus}</p>
          <p style={styles.p}><strong style={styles.strong}>Spesies:</strong> {ikan.spesies}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    lineHeight: 1.6,
    backgroundColor: '#f0f8ff',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column' as 'column',
    minHeight: '100vh',

  },
  h1: {
    color: '#2c3e50',
    marginBottom: '20px',
  },
  img: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  p: {
    color: '#34495e',
    margin: '5px 0',
  },
  container: {
    maxWidth: '800px',
    width: '100%',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  info: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
  },
  strong: {
    color: '#2980b9',
  },
};

export default IkanDetail;
>>>>>>> 6bbbd4273ecd477d4b76df6d85033fbc115673cc
