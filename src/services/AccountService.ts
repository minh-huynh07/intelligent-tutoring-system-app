import HttpService from './HttpService'

export interface AccountStatsResponse {
  winrate: string
  kills: string
  deaths: string
  assists: string
  goldPerMin: string
  xpPerMin: string
  heroDamage: string
  heroHealing: string
  towerDamage: string
  duration: string
  currentRank: string
}

class AccountService extends HttpService {
  endpoint = 'account'

  async getAccountStats(): Promise<AccountStatsResponse> {
    return {
      winrate: '50%',
      kills: 'Text',
      deaths: '9 / 16',
      assists: '19 / 37',
      goldPerMin: '333 / 411',
      xpPerMin: '512 / 683',
      heroDamage: '9.9K / 13.9K',
      heroHealing: 'Text',
      towerDamage: '171 / 636',
      duration: '35:08 / 47:05',
      currentRank: 'Cursader'
    }
  }
}

export default AccountService
