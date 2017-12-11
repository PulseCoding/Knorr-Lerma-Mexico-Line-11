var fs = require('fs');
var modbus = require('jsmodbus');
var PubNub = require('pubnub');
try{
  var i=0;
var Fillerct = null,
    Fillerresults = null,
    CntInFiller = null,
    CntOutFiller = null,
    Filleractual = 0,
    Fillertime = 0,
    Fillersec = 0,
    FillerflagStopped = false,
    Fillerstate = 0,
    Fillerspeed = 0,
    FillerspeedTemp = 0,
    FillerflagPrint = 0,
    FillersecStop = 0,
    FillerdeltaRejected = null,
    FillerONS = false,
    FillertimeStop = 60, //NOTE: Timestop
    FillerWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
    FillerflagRunning = false,
    FillerRejectFlag = false,
    FillerReject,
    FillerVerify = (function(){
      try{
        FillerReject = fs.readFileSync('FillerRejected.json')
        if(FillerReject.toString().indexOf('}') > 0 && FillerReject.toString().indexOf('{\"rejected\":') != -1){
          FillerReject = JSON.parse(FillerReject)
        }else{
          throw 12121212
        }
      }catch(err){
        if(err.code == 'ENOENT' || err == 12121212){
          fs.writeFileSync('FillerRejected.json','{"rejected":0}') //NOTE: Change the object to what it usually is.
          FillerReject = {
            rejected : 0
          }
        }
      }
    })();
  var WaitMaterialSBoxFormer2 = null,
      CntOutSBoxFormer = null,
      CntInSBoxFormer = null,
      CntOutBoxFormer1 = null,
      CntInCasePacker = null,
      CntOutEOL= null,
      CntOutCasePacker = null,
      CntOutBoxFormer = null,
      secEOL=0;
var PrimaryBoxFormerct = null,
    PrimaryBoxFormerresults = null,
    CntInPrimaryBoxFormer = null,
    CntOutPrimaryBoxFormer = null,
    PrimaryBoxFormeractual = 0,
    PrimaryBoxFormertime = 0,
    PrimaryBoxFormersec = 0,
    PrimaryBoxFormerflagStopped = false,
    PrimaryBoxFormerstate = 0,
    PrimaryBoxFormerspeed = 0,
    PrimaryBoxFormerspeedTemp = 0,
    PrimaryBoxFormerflagPrint = 0,
    PrimaryBoxFormersecStop = 0,
    PrimaryBoxFormerONS = false,
    PrimaryBoxFormertimeStop = 60, //NOTE: Timestop
    PrimaryBoxFormerWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
    PrimaryBoxFormerflagRunning = false;
var Grouperct = null,
    Grouperresults = null,
    CntInGrouper = null,
    CntOutGrouper = null,
    Grouperactual = 0,
    Groupertime = 0,
    Groupersec = 0,
    GrouperflagStopped = false,
    Grouperstate = 0,
    Grouperspeed = 0,
    GrouperspeedTemp = 0,
    GrouperflagPrint = 0,
    GroupersecStop = 0,
    GrouperONS = false,
    GroupertimeStop = 60, //NOTE: Timestop
    GrouperWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
    GrouperflagRunning = false;
var SBoxFormerct = null,
    SBoxFormerresults = null,
    CntInSBoxFormer = null,
    CntOutSBoxFormer = null,
    SBoxFormeractual = 0,
    SBoxFormertime = 0,
    SBoxFormersec = 0,
    SBoxFormerflagStopped = false,
    SBoxFormerstate = 0,
    SBoxFormerspeed = 0,
    SBoxFormerspeedTemp = 0,
    SBoxFormerflagPrint = 0,
    SBoxFormersecStop = 0,
    SBoxFormerONS = false,
    SBoxFormertimeStop = 60, //NOTE: Timestop
    SBoxFormerWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
    SBoxFormerflagRunning = false;
var CasePackerct = null,
    CasePackerresults = null,
    CntInCasePacker = null,
    CntOutCasePacker = null,
    CasePackeractual = 0,
    CasePackertime = 0,
    CasePackersec = 0,
    CasePackerflagStopped = false,
    CasePackerstate = 0,
    CasePackerspeed = 0,
    CasePackerspeedTemp = 0,
    CasePackerflagPrint = 0,
    CasePackersecStop = 0,
    CasePackerONS = false,
    CasePackertimeStop = 60, //NOTE: Timestop
    CasePackerWorktime = 0.99, //NOTE: Intervalo de tiempo en minutos para actualizar el log
    CasePackerflagRunning = false;
  var CntRjFiller = 0,
      CntInFillerAnt = 0,
      CntOutFillerAnt = 0;
  var secPubNub=0;
  var CntOutEOL=null,
      secEOL=0;
  var publishConfig;
      var intId1,intId2,intId3;
      var files = fs.readdirSync("C:/PULSE/L11_LOGS/"); //Leer documentos
      var actualdate = Date.now(); //Fecha actual
      var text2send=[];//Vector a enviar
      var flagInfo2Send=0;
      var i=0;
      var pubnub = new PubNub({
        publishKey:		"pub-c-8d024e5b-23bc-4ce8-ab68-b39b00347dfb",
      subscribeKey: 		"sub-c-c3b3aa54-b44b-11e7-895e-c6a8ff6a3d85",
        uuid: "ler11-0000-1234"
      });


      var senderData = function (){
        pubnub.publish(publishConfig, function(status, response) {
      });}


      var client1 = modbus.client.tcp.complete({
        'host': "192.168.10.90",
        'port': 502,
        'autoReconnect': true,
        'timeout': 60000,
        'logEnabled': true,
        'reconnectTimeout' : 30000
      });
      var client2 = modbus.client.tcp.complete({
        'host': "192.168.10.91",
        'port': 502,
        'autoReconnect': true,
        'timeout': 60000,
        'logEnabled': true,
        'reconnectTimeout' : 30000
      });
      var client3 = modbus.client.tcp.complete({
        'host': "192.168.10.92",
        'port': 502,
        'autoReconnect': true,
        'timeout': 60000,
        'logEnabled': true,
        'reconnectTimeout' : 30000
      });
}catch(err){
    fs.appendFileSync("error_declarations.log",err + '\n');
}

try{
  client1.connect();
  client2.connect();
  client3.connect();
}catch(err){
  fs.appendFileSync("error_connection.log",err + '\n');
}
try{
  /*----------------------------------------------------------------------------------Funcction-------------------------------------------------------------------------------------------*/

  var joinWord=function(num1, num2) {
    var bits = "00000000000000000000000000000000";
    var bin1 = num1.toString(2),
      bin2 = num2.toString(2),
      newNum = bits.split("");

    for (i = 0; i < bin1.length; i++) {
      newNum[31 - i] = bin1[(bin1.length - 1) - i];
    }
    for (i = 0; i < bin2.length; i++) {
      newNum[15 - i] = bin2[(bin2.length - 1) - i];
    }
    bits = newNum.join("");
    return parseInt(bits, 2);
  };
  var idle=function(){
    i=0;
    text2send=[];
    for (var k=0;k<files.length;k++){//Verificar los archivos
      var stats = fs.statSync("C:/PULSE/L11_LOGS/"+files[k]);
      var mtime = new Date(stats.mtime).getTime();
      if (mtime< (Date.now() - (15*60*1000))&&files[k].indexOf("serialbox")==-1){
        flagInfo2Send=1;
        text2send[i]=files[k];
        i++;
      }
    }
  };
//PubNub --------------------------------------------------------------------------------------------------------------------
setInterval(function(){
        if(secPubNub>=60*5){
          idle();
          secPubNub=0;
          publishConfig = {
            channel : "Lerma_Monitor",
            message : {
                  line: "11",
                  tt: Date.now(),
                  machines:text2send

                }
          };
          senderData();
        }
        secPubNub++;
      },1000);
//PubNub --------------------------------------------------------------------------------------------------------------------


client1.on('connect', function(err) {
  intId1 =
    setInterval(function(){
        client1.readHoldingRegisters(0, 16).then(function(resp) {
          CntInFiller = joinWord(resp.register[0], resp.register[1]).Val * 8;
          CntOutFiller = joinWord(resp.register[2], resp.register[3]) + joinWord(resp.register[4], resp.register[5]) + joinWord(resp.register[6], resp.register[7]) + joinWord(resp.register[8], resp.register[9]);
        //------------------------------------------Filler----------------------------------------------
              Fillerct = CntOutFiller // NOTE: igualar al contador de salida
              if (!FillerONS && Fillerct) {
                FillerspeedTemp = Fillerct
                Fillersec = Date.now()
                FillerONS = true
                Fillertime = Date.now()
              }
              if(Fillerct > Filleractual){
                if(FillerflagStopped){
                  Fillerspeed = Fillerct - FillerspeedTemp
                  FillerspeedTemp = Fillerct
                  Fillersec = Date.now()
                  FillerdeltaRejected = null
                  FillerRejectFlag = false
                  Fillertime = Date.now()
                }
                FillersecStop = 0
                Fillerstate = 1
                FillerflagStopped = false
                FillerflagRunning = true
              } else if( Fillerct == Filleractual ){
                if(FillersecStop == 0){
                  Fillertime = Date.now()
                  FillersecStop = Date.now()
                }
                if( ( Date.now() - ( FillertimeStop * 1000 ) ) >= FillersecStop ){
                  Fillerspeed = 0
                  Fillerstate = 2
                  FillerspeedTemp = Fillerct
                  FillerflagStopped = true
                  FillerflagRunning = false
                  if(CntInFiller - CntOutFiller - FillerReject.rejected != 0 && ! FillerRejectFlag){
                    FillerdeltaRejected = CntInFiller - CntOutFiller - FillerReject.rejected
                    FillerReject.rejected = CntInFiller - CntOutFiller
                    fs.writeFileSync('FillerRejected.json','{"rejected": ' + FillerReject.rejected + '}')
                    FillerRejectFlag = true
                  }else{
                    FillerdeltaRejected = null
                  }
                  FillerflagPrint = 1
                }
              }
              Filleractual = Fillerct
              if(Date.now() - 60000 * FillerWorktime >= Fillersec && FillersecStop == 0){
                if(FillerflagRunning && Fillerct){
                  FillerflagPrint = 1
                  FillersecStop = 0
                  Fillerspeed = Fillerct - FillerspeedTemp
                  FillerspeedTemp = Fillerct
                  Fillersec = Date.now()
                }
              }
              Fillerresults = {
                ST: Fillerstate,
                CPQI : CntInFiller,
                CPQO : CntOutFiller,
                CPQR : FillerdeltaRejected,
                SP: Fillerspeed
              }
              if (FillerflagPrint == 1) {
                for (var key in Fillerresults) {
                  if( Fillerresults[key] != null && ! isNaN(Fillerresults[key]) )
                  //NOTE: Cambiar path
                  fs.appendFileSync('C:/PULSE/L11_LOGS/mex_ler_Filler_l11.log', 'tt=' + Fillertime + ',var=' + key + ',val=' + Fillerresults[key] + '\n')
                }
                FillerflagPrint = 0
                FillersecStop = 0
                Fillertime = Date.now()
              }
        //------------------------------------------Filler----------------------------------------------
        });//Cierre de lectura
      },1000);
  });//Cierre de cliente

  client1.on('error', function(err){
    clearInterval(intId1);
  });
  client1.on('close', function() {
    clearInterval(intId1);
  });

client2.on('connect', function(err) {
          intId2 = setInterval(function(){
              client2.readHoldingRegisters(0, 16).then(function(resp) {
                CntOutBoxFormer = joinWord(resp.register[10], resp.register[11]) + joinWord(resp.register[12], resp.register[13]) + joinWord(resp.register[14], resp.register[15]);
              });//Cierre de lectura

            },1000);
        });//Cierre de cliente
  client2.on('error', function(err) {
    clearInterval(intId2);
  });
  client2.on('close', function() {
    clearInterval(intId2);
  });
  client3.on('connect', function(err) {
            intId3 = setInterval(function(){
                client3.readHoldingRegisters(0, 16).then(function(resp) {
                  WaitMaterialSBoxFormer2 = joinWord(resp.register[2], resp.register[3]);
                  CntOutSBoxFormer = joinWord(resp.register[6], resp.register[7]);
                  CntInSBoxFormer = joinWord(resp.register[4], resp.register[5]);
                  WaitMaterialSBoxFormer2 = joinWord(resp.register[14], resp.register[15]);
                  CntOutBoxFormer1 = joinWord(resp.register[0], resp.register[1]);
                  CntInCasePacker = joinWord(resp.register[8], resp.register[9]);
                  CntOutEOL= joinWord(resp.register[12], resp.register[13]);
                  CntOutCasePacker = joinWord(resp.register[10], resp.register[11]);
                  CntOutPrimaryBoxFormer = CntOutBoxFormer+CntOutBoxFormer1;
                  CntInPrimaryBoxFormer = CntOutFiller;
                  CntInGrouper = CntOutBoxFormer1 + CntOutBoxFormer;
        //------------------------------------------PrimaryBoxFormer----------------------------------------------
              PrimaryBoxFormerct = CntOutPrimaryBoxFormer // NOTE: igualar al contador de salida
              if (!PrimaryBoxFormerONS && PrimaryBoxFormerct) {
                PrimaryBoxFormerspeedTemp = PrimaryBoxFormerct
                PrimaryBoxFormersec = Date.now()
                PrimaryBoxFormerONS = true
                PrimaryBoxFormertime = Date.now()
              }
              if(PrimaryBoxFormerct > PrimaryBoxFormeractual){
                if(PrimaryBoxFormerflagStopped){
                  PrimaryBoxFormerspeed = PrimaryBoxFormerct - PrimaryBoxFormerspeedTemp
                  PrimaryBoxFormerspeedTemp = PrimaryBoxFormerct
                  PrimaryBoxFormersec = Date.now()
                  PrimaryBoxFormertime = Date.now()
                }
                PrimaryBoxFormersecStop = 0
                PrimaryBoxFormerstate = 1
                PrimaryBoxFormerflagStopped = false
                PrimaryBoxFormerflagRunning = true
              } else if( PrimaryBoxFormerct == PrimaryBoxFormeractual ){
                if(PrimaryBoxFormersecStop == 0){
                  PrimaryBoxFormertime = Date.now()
                  PrimaryBoxFormersecStop = Date.now()
                }
                if( ( Date.now() - ( PrimaryBoxFormertimeStop * 1000 ) ) >= PrimaryBoxFormersecStop ){
                  PrimaryBoxFormerspeed = 0
                  PrimaryBoxFormerstate = 2
                  PrimaryBoxFormerspeedTemp = PrimaryBoxFormerct
                  PrimaryBoxFormerflagStopped = true
                  PrimaryBoxFormerflagRunning = false
                  PrimaryBoxFormerflagPrint = 1
                }
              }
              PrimaryBoxFormeractual = PrimaryBoxFormerct
              if(Date.now() - 60000 * PrimaryBoxFormerWorktime >= PrimaryBoxFormersec && PrimaryBoxFormersecStop == 0){
                if(PrimaryBoxFormerflagRunning && PrimaryBoxFormerct){
                  PrimaryBoxFormerflagPrint = 1
                  PrimaryBoxFormersecStop = 0
                  PrimaryBoxFormerspeed = PrimaryBoxFormerct - PrimaryBoxFormerspeedTemp
                  PrimaryBoxFormerspeedTemp = PrimaryBoxFormerct
                  PrimaryBoxFormersec = Date.now()
                }
              }
              PrimaryBoxFormerresults = {
                ST: PrimaryBoxFormerstate,
                CPQI: CntInPrimaryBoxFormer,
                CPQO:  CntOutPrimaryBoxFormer,
                SP: PrimaryBoxFormerspeed
              }
              if (PrimaryBoxFormerflagPrint == 1) {
                for (var key in PrimaryBoxFormerresults) {
                  if( PrimaryBoxFormerresults[key] != null && ! isNaN(PrimaryBoxFormerresults[key]) )
                  //NOTE: Cambiar path
                  fs.appendFileSync('C:/PULSE/L11_LOGS/mex_ler_PrimaryBoxFormer_l11.log', 'tt=' + PrimaryBoxFormertime + ',var=' + key + ',val=' + PrimaryBoxFormerresults[key] + '\n')
                }
                PrimaryBoxFormerflagPrint = 0
                PrimaryBoxFormersecStop = 0
                PrimaryBoxFormertime = Date.now()
              }
        //------------------------------------------PrimaryBoxFormer----------------------------------------------
        //------------------------------------------Grouper----------------------------------------------
              Grouperct = CntInGrouper // NOTE: igualar al contador de salida
              if (!GrouperONS && Grouperct) {
                GrouperspeedTemp = Grouperct
                Groupersec = Date.now()
                GrouperONS = true
                Groupertime = Date.now()
              }
              if(Grouperct > Grouperactual){
                if(GrouperflagStopped){
                  Grouperspeed = Grouperct - GrouperspeedTemp
                  GrouperspeedTemp = Grouperct
                  Groupersec = Date.now()
                  Groupertime = Date.now()
                }
                GroupersecStop = 0
                Grouperstate = 1
                GrouperflagStopped = false
                GrouperflagRunning = true
              } else if( Grouperct == Grouperactual ){
                if(GroupersecStop == 0){
                  Groupertime = Date.now()
                  GroupersecStop = Date.now()
                }
                if( ( Date.now() - ( GroupertimeStop * 1000 ) ) >= GroupersecStop ){
                  Grouperspeed = 0
                  Grouperstate = 2
                  GrouperspeedTemp = Grouperct
                  GrouperflagStopped = true
                  GrouperflagRunning = false
                  GrouperflagPrint = 1
                }
              }
              Grouperactual = Grouperct
              if(Date.now() - 60000 * GrouperWorktime >= Groupersec && GroupersecStop == 0){
                if(GrouperflagRunning && Grouperct){
                  GrouperflagPrint = 1
                  GroupersecStop = 0
                  Grouperspeed = Grouperct - GrouperspeedTemp
                  GrouperspeedTemp = Grouperct
                  Groupersec = Date.now()
                }
              }
              Grouperresults = {
                ST: Grouperstate,
                CPQIBX: CntInGrouper,
                SP: Grouperspeed
              }
              if (GrouperflagPrint == 1) {
                for (var key in Grouperresults) {
                  if( Grouperresults[key] != null && ! isNaN(Grouperresults[key]) )
                  //NOTE: Cambiar path
                  fs.appendFileSync('C:/PULSE/L11_LOGS/mex_ler_Grouper_l11.log', 'tt=' + Groupertime + ',var=' + key + ',val=' + Grouperresults[key] + '\n')
                }
                GrouperflagPrint = 0
                GroupersecStop = 0
                Groupertime = Date.now()
              }
        //------------------------------------------Grouper----------------------------------------------
        //------------------------------------------SBoxFormer----------------------------------------------
              SBoxFormerct = CntOutSBoxFormer // NOTE: igualar al contador de salida
              if (!SBoxFormerONS && SBoxFormerct) {
                SBoxFormerspeedTemp = SBoxFormerct
                SBoxFormersec = Date.now()
                SBoxFormerONS = true
                SBoxFormertime = Date.now()
              }
              if(SBoxFormerct > SBoxFormeractual){
                if(SBoxFormerflagStopped){
                  SBoxFormerspeed = SBoxFormerct - SBoxFormerspeedTemp
                  SBoxFormerspeedTemp = SBoxFormerct
                  SBoxFormersec = Date.now()
                  SBoxFormertime = Date.now()
                }
                SBoxFormersecStop = 0
                SBoxFormerstate = 1
                SBoxFormerflagStopped = false
                SBoxFormerflagRunning = true
              } else if( SBoxFormerct == SBoxFormeractual ){
                if(SBoxFormersecStop == 0){
                  SBoxFormertime = Date.now()
                  SBoxFormersecStop = Date.now()
                }
                if( ( Date.now() - ( SBoxFormertimeStop * 1000 ) ) >= SBoxFormersecStop ){
                  SBoxFormerspeed = 0
                  SBoxFormerstate = 2
                  SBoxFormerspeedTemp = SBoxFormerct
                  SBoxFormerflagStopped = true
                  SBoxFormerflagRunning = false
                  SBoxFormerflagPrint = 1
                }
              }
              SBoxFormeractual = SBoxFormerct
              if(Date.now() - 60000 * SBoxFormerWorktime >= SBoxFormersec && SBoxFormersecStop == 0){
                if(SBoxFormerflagRunning && SBoxFormerct){
                  SBoxFormerflagPrint = 1
                  SBoxFormersecStop = 0
                  SBoxFormerspeed = SBoxFormerct - SBoxFormerspeedTemp
                  SBoxFormerspeedTemp = SBoxFormerct
                  SBoxFormersec = Date.now()
                }
              }
              SBoxFormerresults = {
                ST: SBoxFormerstate,
                CPQI: CntInSBoxFormer,
                CPQO:  CntOutSBoxFormer,
                SP: SBoxFormerspeed
              }
              if (SBoxFormerflagPrint == 1) {
                for (var key in SBoxFormerresults) {
                  if( SBoxFormerresults[key] != null && ! isNaN(SBoxFormerresults[key]) )
                  //NOTE: Cambiar path
                  fs.appendFileSync('C:/PULSE/L11_LOGS/mex_ler_SBoxFormer_l11.log', 'tt=' + SBoxFormertime + ',var=' + key + ',val=' + SBoxFormerresults[key] + '\n')
                }
                SBoxFormerflagPrint = 0
                SBoxFormersecStop = 0
                SBoxFormertime = Date.now()
              }
        //------------------------------------------SBoxFormer----------------------------------------------
        //------------------------------------------CasePacker----------------------------------------------
              CasePackerct = CntOutCasePacker // NOTE: igualar al contador de salida
              if (!CasePackerONS && CasePackerct) {
                CasePackerspeedTemp = CasePackerct
                CasePackersec = Date.now()
                CasePackerONS = true
                CasePackertime = Date.now()
              }
              if(CasePackerct > CasePackeractual){
                if(CasePackerflagStopped){
                  CasePackerspeed = CasePackerct - CasePackerspeedTemp
                  CasePackerspeedTemp = CasePackerct
                  CasePackersec = Date.now()
                  CasePackertime = Date.now()
                }
                CasePackersecStop = 0
                CasePackerstate = 1
                CasePackerflagStopped = false
                CasePackerflagRunning = true
              } else if( CasePackerct == CasePackeractual ){
                if(CasePackersecStop == 0){
                  CasePackertime = Date.now()
                  CasePackersecStop = Date.now()
                }
                if( ( Date.now() - ( CasePackertimeStop * 1000 ) ) >= CasePackersecStop ){
                  CasePackerspeed = 0
                  CasePackerstate = 2
                  CasePackerspeedTemp = CasePackerct
                  CasePackerflagStopped = true
                  CasePackerflagRunning = false
                  CasePackerflagPrint = 1
                }
              }
              CasePackeractual = CasePackerct
              if(Date.now() - 60000 * CasePackerWorktime >= CasePackersec && CasePackersecStop == 0){
                if(CasePackerflagRunning && CasePackerct){
                  CasePackerflagPrint = 1
                  CasePackersecStop = 0
                  CasePackerspeed = CasePackerct - CasePackerspeedTemp
                  CasePackerspeedTemp = CasePackerct
                  CasePackersec = Date.now()
                }
              }
              CasePackerresults = {
                ST: CasePackerstate,
                CPQICARTON : CntInCasePacker,
                CPQISBOX : CntOutSBoxFormer,
                CPQO:  CntOutCasePacker,
                SP: CasePackerspeed
              }
              if (CasePackerflagPrint == 1) {
                for (var key in CasePackerresults) {
                  if( CasePackerresults[key] != null && ! isNaN(CasePackerresults[key]) )
                  //NOTE: Cambiar path
                  fs.appendFileSync('C:/PULSE/L11_LOGS/mex_ler_CasePacker_l11.log', 'tt=' + CasePackertime + ',var=' + key + ',val=' + CasePackerresults[key] + '\n')
                }
                CasePackerflagPrint = 0
                CasePackersecStop = 0
                CasePackertime = Date.now()
              }
        //------------------------------------------CasePacker----------------------------------------------
                /*----------------------------------------------------------------------------------EOL----------------------------------------------------------------------------------*/
                      if(secEOL>=60 && CntOutEOL){
                        fs.appendFileSync("C:/PULSE/L11_LOGS/mex_ler_EOL_l11.log","tt="+Date.now()+",var=EOL"+",val="+CntOutEOL+"\n");
                        secEOL=0;
                      }else{
                        secEOL++;
                      }
                /*----------------------------------------------------------------------------------EOL----------------------------------------------------------------------------------*/
      });//Cierre de lectura

    },1000);
});//Cierre de cliente
    client3.on('error', function(err) {
      clearInterval(intId3);
    });
    client3.on('close', function() {
      clearInterval(intId3);
    });
}catch(err){
    fs.appendFileSync("error.log",err + '\n');
}
