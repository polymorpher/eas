const debug = process.env.DEBUG

const config = {
  debug,
  easContract: process.env.EAS_CONTRACT ?? (debug ? '0x9BC52FBcCcde8cEADAEde51a25dBeD489b201e53' : '0x476e14D956dca898C33262aecC81407242f8431A'),
  explorer: process.env.EXPLORER_URL ?? 'https://explorer.harmony.one/#/tx/{{txId}}',
  defaultRpc: process.env.DEFAULT_RPC ?? 'https://api.harmony.one',
  easServer: process.env.EAS_SERVER ?? 'https://1ns-eas.hiddenstate.xyz',
  tld: process.env.TLD ?? 'country',
  message (sld, alias, forwardAddress): string {
    return `You are about to authorize forwarding all emails sent to [${alias}@${sld}.${config.tld}] to [${forwardAddress} instead]`
  }
}

export default config
