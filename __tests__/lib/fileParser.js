const fileParser = require('../../lib/fileParser')();

it('test send file level1 to parser', function() {
    const data = `100000  ATIVO             1000  300   500   1200
    110000  ATIVO CIRCULANTE  500   100   200   600
    111000  DISPONIVEL        200   100   50    150
    200000  PASSIVO           800   250   450   1000`;
    const dataReturn = fileParser.parseInArray(data);
    console.log(dataReturn);
    if (dataReturn.length > 0) {
        return true;
    }
});


it('test send file level2 to parser', function() {
    const data =  `1				  ATIVO							1.120.807,67D		527.081,41					464.716,15			1.183.172,93D					
																										
																										
																										
    1.1				     Ativo Circulante							130.288,57D		527.081,41					464.716,15			192.653,83D					
                                                                                                           
    1.1.1				        Caixa							4.000,98D		104.653,71					108.648,69			6,00D					
                                                                                                           
    1.1.1.01				           Caixa							4.000,98D		104.653,71					108.648,69			6,00D					
                                                                                                           
    1.1.2				        Bancos							44.750,72D		282.256,32					268.764,52			58.242,52D					
                                                                                                           
    1.1.2.02				           Bradesco Conta: 9999999-9							1,00D		203.835,57					203.835,57			1,00D					
                                                                                                           
    1.1.2.03				           Bradesco Conta: 9999999-9							1,00D		64.845,40					64.845,40			1,00D					
                                                                                                           
    1.1.2.04				           Bradesco Conta Poupanca: 9999999-9							5.694,85D		8.502,20					6,78			14.190,27D					
                                                                                                           
    1.1.2.05				           Bradesco Conta Poupanca:9999999-9							39.053,87D		5.073,15					76,77			44.050,25D					
                                                                                                           
    1.1.3				        Aplicaçoes Financeiras							81.536,87D		140.171,38					87.302,94			134.405,31D					
                                                                                                           
    1.1.3.02				           Bradesco Aplicaçoes 9999999-9							87.827,84D		52.134,00					12.741,40			127.220,44D					
                                                                                                           
    1.1.3.03				           Bradesco Aplicaçoes 9999999-9							6.290,97C		88.037,38					74.561,54			7.184,87D					
                                                                                                           
    1.2				     REALIZAVEL A LONGO PRAZO							12.368,24D		0					0			12.368,24D					
                                                                                                           
    1.2.1				        REALIZAVEL A LONGO PRAZO							12.368,24D		0					0			12.368,24D					
                                                                                                           
    1.2.1.02				           Emprestimos a Associados							12.368,24D		0					0			12.368,24D					
                                                                                                           
    1.3				     PERMANENTE							978.150,86D		0					0			978.150,86D					
                                                                                                           
    1.3.1				        IMOBILIZADO							976.650,86D		0					0			976.650,86D					
                                                                                                           
    1.3.1.04				           Moveis e Utensilios							95.539,50D		0					0			95.539,50D					
                                                                                                           
    1.3.1.05				           Instalacoes							245.600,50D		0					0			245.600,50D					
                                                                                                           
    1.3.1.06				           Computadores e Perifericos							7.687,41D		0					0			7.687,41D					
                                                                                                           
    1.3.1.08				           Sede Campestre Sindicato							627.823,45D		0					0			627.823,45D					
                                                                                                           
    1.3.3				        Intangivel							1.500,00D		0					0			1.500,00D					
                                                                                                           
    1.3.3.03				           Marcas e Patentes							1.500,00D		0					0			1.500,00D					
                                                                                                           
   2				  PASSIVO							1.080.167,44C		0					0			1.080.167,44C					
                                                                                                           
                                                                                                           
                                                                                                           
    2.3				     PATRIMONIO SOCIAL							1.080.167,44C		0					0			1.080.167,44C					
                                                                                                           
    2.3.2				        Superavit ou Deficit							1.080.167,44C		0					0			1.080.167,44C					
                                                                                                           
    2.3.2.01				           Superavit							1.114.092,00C		0					0			1.114.092,00C					
                                                                                                           
    2.3.2.02				           Deficit							33.924,56D		0					0			33.924,56D					
                                                                                                           
   3				  DESPESAS E CUSTOS							219.398,02D		99.112,37					0			318.510,39D					
                                                                                                           
                                                                                                           
                                                                                                           
    3.1				     Despesas Gerais							194.940,27D		85.047,98					0			279.988,25D					
                                                                                                           
    3.1.1				        Despesas com Pessoal							39.005,75D		16.091,84					0			55.097,59D					
                                                                                                           
    3.1.1.01				           Salarios							17.161,50D		6.677,80					0			23.839,30D					
                                                                                                           
    3.1.1.03				           Fgts							1.757,55D		857,24					0			2.614,79D					
                                                                                                           
    3.1.1.04				           Previdencia Social - Inss							7.334,76D		3.541,07					0			10.875,83D					
                                                                                                           
    3.1.1.06				           Ferias							5.242,10D		0					0			5.242,10D					
                                                                                                           
    3.1.1.08				           Adiantamento de Salário.							3.250,00D		2.872,13					0			6.122,13D					
                                                                                                           
    3.1.1.09				           Vale Transporte.							1.419,00D		843,6					0			2.262,60D					
                                                                                                           
    3.1.1.10				           Ir Retido na Fonte							500,84D		0					0			500,84D					
                                                                                                           
    3.1.1.11				           Alimentação de Funcionários.							2.340,00D		1.300,00					0			3.640,00D					
                                                                                                           
    3.1.2				        Despesas Administrativas e de Estrutur							100.740,67D		61.210,48					0			161.951,15D					
                                                                                                           
    3.1.2.01				           Consumo de Energia Eletrica							1.596,58D		706,67					0			2.303,25D					
                                                                                                           
    3.1.2.02				           Despesas com Telefone							648,40D		668,4					0			1.316,80D					
                                                                                                           
    3.1.2.03				           Consumo de Agua do Amazonas							504,92D		1.255,21					0			1.760,13D					`;
    const dataReturn = fileParser.parseInArray(data);
    //console.log(dataReturn);
    if (dataReturn.length > 0) {
        return true;
    }
})