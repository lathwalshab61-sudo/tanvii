import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'forensicDatabase.json');

// Default initial dataset adhering to the FORENSIX design & schema
const INITIAL_DATA = {
  metrics: [
    {
      id: "precision",
      label: "Biometric Precision",
      value: "99.98%",
      color: "text-tertiary",
      detail: "Statistical false match rate p < 0.0001 under NIST 800-76 standards",
      timestamp: new Date().toISOString()
    },
    {
      id: "samples",
      label: "Samples Processed",
      value: "14.2k",
      color: "text-primary",
      detail: "Active repository of validated criminalistics specimens & profiles",
      timestamp: new Date().toISOString()
    },
    {
      id: "accreditation",
      label: "Accredited Lab",
      value: "ISO 17025",
      color: "text-secondary-fixed",
      detail: "Full forensic calibration and testing laboratory accreditation",
      timestamp: new Date().toISOString()
    }
  ],
  telemetry: {
    nodeId: "709-X",
    status: "SYS READY",
    encryption: "TLS_v1.3 [SHA384]",
    calibration: "0.0024 ppm",
    signal: "STABLE",
    sector: "SECTOR 04B / CHROMATOGRAPHY ARRAY",
    latencyMs: 14,
    pgpKey: "4A9F 1120 DE83 99B0",
    directCommandLine: "+1 (800) 555-CRIME",
    coordinates: "38.8977° N, 77.0365° W"
  },
  capabilities: [
    {
      id: "toxicology",
      category: "chemical",
      title: "Forensic Toxicology",
      code: "GC-MS / LC",
      icon: "bloodtype",
      badgeBg: "bg-primary/10",
      badgeText: "text-primary",
      iconBg: "bg-surface-container-high",
      iconColor: "text-primary",
      summary: "Post-mortem toxic chemical mapping, pharmaceutical overdose quantitation, narcotics identification, and heavy metal absorption profiling.",
      details: "Utilizes tandem Gas Chromatography-Mass Spectrometry (GC-MS) alongside Ultra-High-Performance Liquid Chromatography (UHPLC) for sub-nanogram detection of psychoactive compounds, synthetic opioids, organophosphates, and metabolic toxins.",
      leadScientist: "Dr. Alistair Finch, Ph.D., DABFT",
      turnaroundTime: "24-48 Hours",
      standards: "SWGTOX / ISO 17025 Compliant"
    },
    {
      id: "dna",
      category: "biological",
      title: "DNA Analysis",
      code: "STR / NGS",
      icon: "strikethrough_s",
      badgeBg: "bg-tertiary/10",
      badgeText: "text-tertiary",
      iconBg: "bg-surface-container-high",
      iconColor: "text-tertiary",
      summary: "High-sensitivity Short Tandem Repeat profiling, degraded mitochondrial extraction, and investigative genetic genealogy lineage networks.",
      details: "Employs 27-locus STR multiplexes, Next-Generation Sequencing (NGS) SNP arrays, and specialized touch DNA lysis techniques for recovering single-source and complex mixture genotypes from heavily compromised environmental exhibits.",
      leadScientist: "Dr. Elena Rostova, Ph.D.",
      turnaroundTime: "12-36 Hours",
      standards: "FBI QAS / SWGDAM Compliant"
    },
    {
      id: "fingerprints",
      category: "biological",
      title: "Fingerprint Examination",
      code: "AFIS / FUME",
      icon: "fingerprint",
      badgeBg: "bg-primary-container/10",
      badgeText: "text-primary-container",
      iconBg: "bg-surface-container-high",
      iconColor: "text-primary-container",
      summary: "Automated Fingerprint ID queries, cyanoacrylate superglue fuming, multi-spectral UV contrast, and ridge minutiae pattern alignment.",
      details: "Combines vacuum metal deposition (VMD), cyanoacrylate ester thermofuming, and algorithmic biometric vector comparisons against national AFIS and INTERPOL repositories for latent friction ridge extraction.",
      leadScientist: "Marcus Vance, CLPE",
      turnaroundTime: "6-18 Hours",
      standards: "SWGFAST / ENFSI Standard"
    },
    {
      id: "digital",
      category: "physical",
      title: "Digital Forensics",
      code: "DFIR / BLOCK",
      icon: "terminal",
      badgeBg: "bg-secondary/10",
      badgeText: "text-secondary",
      iconBg: "bg-surface-container-high",
      iconColor: "text-secondary",
      summary: "Incident response, encrypted cold-wallet tracking, memory dumps carving, and cryptographically verified forensic imaging preservation.",
      details: "Deep RAM analysis with volatility-framework kernels, write-blocked bitstream disk replications, encrypted hardware enclave bypass, and automated timeline reconstruction across IoT and SCADA control planes.",
      leadScientist: "Kaelen Thorne, GCFA / CISSP",
      turnaroundTime: "4-24 Hours",
      standards: "NIST SP 800-86 / ISO 27037"
    },
    {
      id: "ballistics",
      category: "physical",
      title: "Forensic Ballistics",
      code: "IBIS / GSR",
      icon: "adjust",
      badgeBg: "bg-primary/10",
      badgeText: "text-primary",
      iconBg: "bg-surface-container-high",
      iconColor: "text-primary",
      summary: "Striation comparison microscopy, gunshot residue (GSR) SEM-EDS elemental analysis, and 3D laser flight trajectory reconstruction.",
      details: "Automated optical correlation via Integrated Ballistics Identification System (IBIS), lead/barium/antimony nanoparticle detection using Scanning Electron Microscopy with Energy Dispersive X-ray Spectroscopy (SEM-EDS).",
      leadScientist: "Insp. Teresa Zhao",
      turnaroundTime: "18-48 Hours",
      standards: "AFTE / ATF IBIS Verified"
    },
    {
      id: "documents",
      category: "chemical",
      title: "Questioned Documents",
      code: "ESDA / TLC",
      icon: "draw",
      badgeBg: "bg-tertiary/10",
      badgeText: "text-tertiary",
      iconBg: "bg-surface-container-high",
      iconColor: "text-tertiary",
      summary: "Electrostatic indentation detection (ESDA), ink thin-layer chromatography, stroke velocity analysis, and obliteration recovery.",
      details: "Electrostatic imaging of latent indentations up to seven sheets below original writing, Video Spectral Comparator (VSC) infrared luminescence for eradicated ink layers, and high-resolution chemical ink formulation discrimination.",
      leadScientist: "Julian Hayes, D-ABFDE",
      turnaroundTime: "24-72 Hours",
      standards: "SWGDOC / ASTM E2290"
    }
  ],
  cases: [
    {
      id: "TRC-8921",
      tag: "DOSSIER #TRC-8921",
      status: "SOLVED // CLOSED",
      statusColor: "text-tertiary",
      title: "The Phantom Vapor: Trace Chemical Reconstruction",
      summary: "Cryptic commercial sabotage suspected of poisoning manufacturing vats solved via gas chromatography-mass spectrometry, isolating a non-native organophosphate at 0.8 parts per billion.",
      method: "GC-MS Molecular Profiling & Micro-FTIR",
      methodColor: "text-primary",
      classification: "Industrial Sabotage / Toxicology",
      jurisdiction: "Sector 04 Federal District",
      evidenceItems: [
        "Vat sample matrix #A-44",
        "Perimeter HVAC particulate filter swab",
        "Gas chromatography retention retention indices"
      ],
      fullReport: "Analytical spectrometry confirmed an engineered organophosphate isomer was introduced between 02:14 and 02:45 UTC. By cross-referencing mass fragment signatures with solvent carrier degradation profiles, investigators traced the delivery aerosol back to an unauthorized canister concealed in an auxiliary service duct."
    },
    {
      id: "GEN-0414",
      tag: "DOSSIER #GEN-0414",
      status: "IDENTIFIED // ARREST",
      statusColor: "text-primary",
      title: "Cold Echo: Genetic Kinship Genealogy Resolution",
      summary: "A 20-year-old cold homicide cracked using highly degraded petrous bone extraction, Whole Genome Sequencing (WGS), and bioinformatic tree triangulation leading to 3rd-degree cousin match.",
      method: "Next-Gen SNP & STR Multiplexing",
      methodColor: "text-tertiary",
      classification: "Cold Case Homicide / Genomics",
      jurisdiction: "Metro Cold Case Squad",
      evidenceItems: [
        "Petrous temporal bone core (0.2g)",
        "High-throughput Illumina NovaSeq raw reads",
        "GEDmatch PRO investigative genealogy trees"
      ],
      fullReport: "Despite extreme hydrolytic DNA cleavage, modern enzymatic library prep restored sufficient sequence coverage across 650,000 informative SNPs. Bioinformatic triangulation pinpointed a maternal lineage node from which a suspect identity was narrowed down and corroborated with surreptitious DNA verification."
    },
    {
      id: "CYB-7703",
      tag: "DOSSIER #CYB-7703",
      status: "NEUTRALIZED // LOGGED",
      statusColor: "text-secondary",
      title: "The Silent Byte: Critical Infrastructure Intrusion",
      summary: "State-sponsored SCADA exfiltration reconstructed via unallocated volatile RAM dump extraction, retrieving a wiped kernel driver and hardcoded command-and-control IP tunnels.",
      method: "Volatile RAM Forensics & Microcode Carving",
      methodColor: "text-secondary font-mono font-medium",
      classification: "Cyber Threat / ICS Forensics",
      jurisdiction: "National Cyber Defense Agency",
      evidenceItems: [
        "64GB DDR4 live volatile RAM dump",
        "PLC firmware non-volatile flash image",
        "Encrypted egress network captures"
      ],
      fullReport: "Malware resided entirely in ring-0 kernel memory using fileless injection. Analysts carved remnant memory tables to reconstitute an unlinked rootkit driver, revealing hardcoded DNS-over-HTTPS fallback command nodes and preventing an imminent grid shut-off cascade."
    }
  ],
  resources: [
    {
      id: "res-1",
      category: "Articles",
      type: "PDF Guide",
      title: "Chain of Custody Standard Operating Guide",
      description: "PDF Guide • 24 Pages • ISO-Compliant protocol for physical evidence handling, electronic hashing, and court admissibility preservation.",
      icon: "article",
      iconColor: "text-primary",
      fileSize: "4.8 MB",
      action: "download"
    },
    {
      id: "res-2",
      category: "Research Papers",
      type: "Research Paper",
      title: "CRISPR-Guided Touch DNA Detection",
      description: "Research Paper • Peer Reviewed (2025) on ultra-low-copy biometric extraction from touched surfaces using Cas12a molecular probes.",
      icon: "science",
      iconColor: "text-tertiary",
      fileSize: "1.2 MB",
      action: "download"
    },
    {
      id: "res-3",
      category: "Student Labs",
      type: "Interactive Simulator",
      title: "Interactive Virtual Spectrometry Lab",
      description: "Interactive Web Simulator • Level 3 hands-on tutorial for calibrating quadrupole mass spectrometers and tuning laser ionization.",
      icon: "school",
      iconColor: "text-secondary",
      fileSize: "Web App",
      action: "launch"
    },
    {
      id: "res-4",
      category: "Research Papers",
      type: "Technical Whitepaper",
      title: "Sub-Micron SEM-EDS GSR Characterization",
      description: "Standardized morphological classification of lead-free primer residues utilizing automated scanning electron microscopy.",
      icon: "biotech",
      iconColor: "text-primary",
      fileSize: "3.4 MB",
      action: "download"
    }
  ],
  inquiries: [
    {
      id: "INQ-INIT-001",
      receiptHash: "TX-7F2A90C1-TLS13",
      fullName: "Dr. Evelyn Vance",
      email: "vance@forensix-lab.org",
      classification: "Forensic Case Inquiry",
      statement: "Submitting preliminary volatile memory dump for Sector 04 SCADA incident validation.",
      channel: "TLS_v1.3_ENCRYPTED",
      createdAt: new Date().toISOString()
    }
  ]
};

// Database Access Object
class Database {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
    }
  }

  read() {
    try {
      this.init();
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      console.error('Error reading DB, using initial data:', err);
      return INITIAL_DATA;
    }
  }

  write(data) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('Error writing DB:', err);
      return false;
    }
  }

  getMetrics() {
    const db = this.read();
    return db.metrics || [];
  }

  getTelemetry() {
    const db = this.read();
    return db.telemetry || {};
  }

  getCapabilities() {
    const db = this.read();
    return db.capabilities || [];
  }

  getCapabilityById(id) {
    const db = this.read();
    return db.capabilities.find(c => c.id.toLowerCase() === id.toLowerCase());
  }

  getCases() {
    const db = this.read();
    return db.cases || [];
  }

  getCaseById(id) {
    const db = this.read();
    return db.cases.find(c => c.id.toLowerCase() === id.toLowerCase());
  }

  getResources() {
    const db = this.read();
    return db.resources || [];
  }

  getInquiries() {
    const db = this.read();
    return db.inquiries || [];
  }

  createInquiry(inquiryData) {
    const db = this.read();
    if (!db.inquiries) db.inquiries = [];

    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const id = `INQ-${Date.now().toString().slice(-4)}-${randomSuffix}`;
    const receiptHash = `TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}-TLS13`;

    const newInquiry = {
      id,
      receiptHash,
      fullName: inquiryData.fullName,
      email: inquiryData.email,
      classification: inquiryData.classification || 'Forensic Case Inquiry',
      statement: inquiryData.statement,
      channel: 'TLS_v1.3_ENCRYPTED [SHA384]',
      status: 'SEALED & ROUTED',
      createdAt: new Date().toISOString()
    };

    db.inquiries.unshift(newInquiry);
    this.write(db);
    return newInquiry;
  }
}

export const db = new Database();

