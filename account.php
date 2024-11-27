<!doctype html>
<html lang="it" data-bs-theme="auto">
<?php include("../portale/head.php"); ?>

<body>
  <?php include("../portale/header.php"); ?>
  <div class="container-fluid">

    <div class="row">
      <?php include("../portale/menu.php"); ?>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main-page">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Gestione Account</h1>
        </div>
        <div class="container my-2">
          <div class="row">
            <div class="col-md-6">
              <fieldset class="border rounded p-1 mb-3">
                <legend class="float-none w-auto px-2" style="font-size:12px; font-weight:bold">Immagine Personale</legend>
                <div class="container">
                  <div class="row">
                    <div class="col-md-4 text-center mb-3">
                      <img src="" class="rounded hide" width="160" height="160" alt="Immagine Profilo" id="img-exist">
                      <svg id="img-no-exist" class="bd-placeholder-img img-thumbnail" width="200" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="immagine profilo" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <title>Nessuna Immagine</title>
                        <rect width="100%" height="100%" fill="#868e96" /><text x="50%" y="50%" fill="#dee2e6" dy=".3em"> Immagine Profilo</text>
                      </svg>
                    </div>
                    <div class="col-md-8">
                      <div class="mb-3 text-center">
                        <label for="formFileSm" class="form-label ">Carica Immagine Profilo (jpg, png - max 10mb)</label>
                        <input class="form-control form-control-sm" type="file" id="file-profilo-img" onchange="abilitaCaricaImgProf()">
                        <div class="invalid-feedback">Formato o grandezza file Errato</div>
                      </div>
                      <div class="mb-3 text-center"><button type="button" class="btn btn-outline-success" id="carica-img-profilo" onclick="caricaImgProfilo('account')" disabled>Carica</button></div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset class="border rounded p-1">
                <legend class="float-none w-auto px-2" style="font-size:12px; font-weight:bold">Dati Personali</legend>
                <div class="container">
                  <div class="row p-2">
                    <div class="col-md-4">Nome: </div>
                    <div class="col-md-8 fw-bold" id="nome"> </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-4">Cognome: </div>
                    <div class="col-md-8 fw-bold" id="cognome"> </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-4">Anno di nascita: </div>
                    <div class="col-md-8 fw-bold" id="annodinascita"> </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-4">Codice Fiscale: </div>
                    <div class="col-md-8 fw-bold" id="cf"> </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-4">E-mail Aziendale: </div>
                    <div class="col-md-8 fw-bold" id="email"> </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-4">E-mail Personale: </div>
                    <div class="col-md-8">
                      <div class="input-group">
                        <input class="form-control form-control-sm" type="text" placeholder="E-mail Personale" id="emailpersonale">
                        <div class="invalid-feedback">Inserire un email valida</div>
                      </div>

                    </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-4">Telefono Aziendale: </div>
                    <div class="col-md-8 fw-bold" id="telefono"> </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-4">Telefono Personale: </div>
                    <div class="col-md-8"><input class="form-control form-control-sm" type="text" placeholder="Telefono Personale" id="telefonopersonale"></div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-4">Indirizzo: </div>
                    <div class="col-md-8 fw-bold" id="indirizzo"> </div>
                  </div>
                  <div class="row p-2">
                    <div class="col-md-12 text-center"><button type="button" class="btn btn-outline-success btn-sm" onclick="changeData()">Salva Modifiche</button> </div>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="col-md-6">
              <fieldset class="border rounded p-1">
                <legend class="float-none w-auto px-2" style="font-size:12px; font-weight:bold">Cambio Password</legend>
                <div class="container">
                  <div class="row p-2">
                    <label>Password Corrente: </label>
                    <div class="input-group">
                      <input type="password" class="form-control form-control-sm psw-input" id="oldpassword" placeholder="Inserisci la password">
                      <button class="btn btn-outline-secondary" type="button" id="togglePassword">
                        <i class="bi bi-eye"></i> <!-- Icona di esempio -->
                      </button>
                      <div class="invalid-feedback">Inserire una password Valida</div>
                    </div>
                  </div>
                  <div class="row p-2">
                    <label>Nuova Password: </label>
                    <div class="input-group">
                      <input type="password" class="form-control form-control-sm psw-input" id="password" placeholder="Inserisci la password">
                      <button class="btn btn-outline-secondary" type="button" id="togglePassword1">
                        <i class="bi bi-eye"></i> <!-- Icona di esempio -->
                      </button>
                      <div class="invalid-feedback">Inserire una password Valida</div>
                    </div>
                  </div>
                  <div class="row p-2">
                    <label>Ripeti Nuova Password: </label>
                    <div class="input-group">
                      <input type="password" class="form-control form-control-sm psw-input" id="password1" placeholder="Inserisci la password">
                      <button class="btn btn-outline-secondary" type="button" id="togglePassword2">
                        <i class="bi bi-eye"></i> <!-- Icona di esempio -->
                      </button>
                      <div class="invalid-feedback">Inserire una password Valida</div>
                    </div>
                  </div>

                  <div class="row p-2">
                    <div class="col-md-12 text-center"><button type="button" class="btn btn-outline-success btn-sm" onclick="cambiaPassword()">Cambia Password</button> </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </main>
    </div>
    <script src="../portale/assets/generalFunction.js"></script>
    <script src="../portale/assets/account.js"></script>
    <?php include("../portale/footer.php"); ?>
</body>

</html>