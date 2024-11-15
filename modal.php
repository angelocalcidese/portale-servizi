<!-- MODALE DI RICARICA -->
<!-- Modale con Spinner Bootstrap -->
<div class="modal fade" id="loadingModal" tabindex="-1" aria-labelledby="loadingModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body text-center">
                <p class="text-center"><img class="logo" src=""></p>
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Attendere...</span>
                </div>
                <p class="mt-3">Caricamento in corso...</p>
            </div>
        </div>
    </div>
</div>

<!-- FINE MODALE DI RICARICA -->
<div class="modal fade" id="notificheModal" tabindex="-1" aria-labelledby="notificheModalLabel" aria-hidden="true">
    <div class="modal-dialog ">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="addListLabel" style="text-shadow:none"><i class=" fa-solid fa-bell fa-shake fa-lg" style="color: #f18e04;"></i> Notifiche</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table" id="table-notifiche">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="body-not">
                        <tr>


                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="messaggiModal" tabindex="-1" aria-labelledby="messaggiModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="addListLabel" style="text-shadow:none"><i class=" fa-solid fa-envelope fa-lg" style="color: #f18e04;"></i> Messaggi e comunicazioni interne</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-5 mb-2 border border-primary rounded pt-3 mx-1">
                            <table class="table" id="table-messaggi">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Data</th>
                                        <th scope="col">Da</th>
                                        <th scope="col">Oggetto</th>
                                        <th scope="col">El.</th>
                                    </tr>
                                </thead>
                                <tbody id="body-mess">

                                </tbody>
                            </table>

                        </div>
                        <div class="col-md-6 border border-primary rounded pt-3  mb-2 mx-1">
                            <div class="container mt-5 mb-5 hide" id="ok-cancella-mess">
                                <div class="row">
                                    <p class="text-center h6">Sei sicuro di Voler Cancellare il messaggio?</p>
                                    <p class="text-center">
                                        <button type="button" class="btn btn-outline-primary" onclick="deleteMessagi()">Si</button>
                                        <button type=" button" class="btn btn-outline-secondary" onclick="cleanMessage()">No</button>
                                    </p>
                                </div>
                            </div>
                            <div class="container mt-5 mb-5" id="nascondi-mess">
                                <div class="row">
                                    <p class="text-center h5">Seleziona un messaggio per visualizzarlo</p>
                                </div>
                            </div>
                            <div class="container hide" id="visualizza-mess">
                                <div class="row">
                                    <div class="col-5"><strong>Da:</strong> <span id="mess-da"></span></div>
                                    <div class="col-3"><strong>Il:</strong> <span id="mess-il"></span></div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-3"><strong>Oggetto:</strong></div>
                                    <div class="col-9" id="mess-oggetto">Oggetto</div>
                                </div>
                                <div class="row mt-3 mb-5">
                                    <div class="col-3"><strong>Messaggio:</strong></div>
                                    <div class="col-9" id="mess-messaggio">Messaggio</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Sei sicuro di voler uscire?</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Se cliccherai su OK uscirai dall'applicazione</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
                <button type="button" class="btn btn-primary" onclick="logoutHeader()">OK</button>
            </div>
        </div>
    </div>
</div>