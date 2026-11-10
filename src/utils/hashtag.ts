/**
 * Helper to generate Brazilian state & location hashtags like #NósNoRio, #NósEmSP, #NósNaBahia
 * Allows all users to instantly identify the state the person is posting from!
 */
export function getLocationHashtag(cidade: string, uf?: string): string {
  const ufUpper = (uf || '').toUpperCase().trim();
  const city = (cidade || '').toLowerCase().trim();

  // If specific UF is given, format the official state hashtag:
  switch (ufUpper) {
    case 'RJ':
      return '#NósNoRio';
    case 'SP':
      return '#NósEmSP';
    case 'BA':
      return '#NósNaBahia';
    case 'MG':
      return '#NósEmMinas';
    case 'AM':
      return '#NósNoAmazonas';
    case 'PR':
      return '#NósNoParaná';
    case 'PE':
      return '#NósEmPernambuco';
    case 'DF':
      return '#NósNoDF';
    case 'RS':
      return '#NósNoRS';
    case 'SC':
      return '#NósEmSC';
    case 'GO':
      return '#NósEmGoiás';
    case 'CE':
      return '#NósNoCeará';
    case 'PA':
      return '#NósNoPará';
    case 'ES':
      return '#NósNoEspíritoSanto';
    case 'MT':
      return '#NósNoMatoGrosso';
    case 'MS':
      return '#NósNoMS';
    case 'RN':
      return '#NósNoRN';
    case 'PB':
      return '#NósNaParaíba';
    case 'AL':
      return '#NósEmAlagoas';
    case 'SE':
      return '#NósEmSergipe';
    case 'PI':
      return '#NósNoPiauí';
    case 'MA':
      return '#NósNoMaranhão';
    case 'RO':
      return '#NósEmRondônia';
    case 'TO':
      return '#NósNoTocantins';
    case 'AC':
      return '#NósNoAcre';
    case 'AP':
      return '#NósNoAmapá';
    case 'RR':
      return '#NósEmRoraima';
    default:
      break;
  }

  // Fallback by city name
  if (city.includes('rio')) return '#NósNoRio';
  if (city.includes('paulo')) return '#NósEmSP';
  if (city.includes('salvador') || city.includes('bahia')) return '#NósNaBahia';
  if (city.includes('manaus') || city.includes('amazonas')) return '#NósNoAmazonas';
  if (city.includes('belo horizonte') || city.includes('minas')) return '#NósEmMinas';
  if (city.includes('curitiba') || city.includes('parana')) return '#NósNoParaná';
  if (city.includes('brasília') || city.includes('brasilia')) return '#NósNoDF';

  return ufUpper ? `#NósEm${ufUpper}` : '#NósNoBrasil';
}
