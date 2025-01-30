const { TrackData } = require('./script');

(async () => {
    try {
        await TrackData();
        console.log('Teste concluído com sucesso.');
    } catch (error) {
        console.error('Erro durante o teste:', error);
    }
})();