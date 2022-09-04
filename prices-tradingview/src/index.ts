import { connect, getCandles } from 'tradingview-ws';

const main = async () => {
    const connection = await connect();
    
    const candles = await getCandles({
      connection,
      symbols: ['MOEX:GAZP'],
      amount: 1,
      timeframe: 60
    });

    await connection.close();

    console.log(`Candles for GAZPRUB:`, candles[0])

    const unsubscribe = connection.subscribe(() => {
      
    });
};

main();
