export interface IOddsData {
     key: string,
        title: string,
        last_update: string,
        markets: [
          {
            key: string,
            last_update: string,
            outcomes: [
              {
                name: string,
                price: number
              },
              {
                name: string,
                price: number
              }
            ]
          }
        ]
}