var janin = {};

janin.currency = {
    createCurrency: function (name, networkVersion, privateKeyPrefix, WIF_Start, CWIF_Start, donate) {
        var currency = {};
        currency.name = name;
        currency.networkVersion = networkVersion;
        currency.privateKeyPrefix = privateKeyPrefix;
        currency.WIF_Start = WIF_Start;
        currency.CWIF_Start = CWIF_Start;
        currency.donate = donate;
        return currency;
    },

    name: function() {
        return janin.selectedCurrency.name;
    },

    networkVersion: function() {
        return janin.selectedCurrency.networkVersion;
    },

    privateKeyPrefix: function() {
        return janin.selectedCurrency.privateKeyPrefix;
    },

    WIF_RegEx: function() {
        return new RegExp("^" + janin.selectedCurrency.WIF_Start + "[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{50}$");
    },

    CWIF_RegEx: function() {
        return new RegExp("^" + janin.selectedCurrency.CWIF_Start + "[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{51}$");
    },

    // Switch currency
    useCurrency: function(index) {
        janin.selectedCurrency = janin.currencies[index];

        var coinImgUrl = "logos/" + janin.currency.name().toLowerCase() + ".png";
        document.getElementById("coinLogoImg").src = coinImgUrl;

        // Update title depending on currency
        document.title = janin.currency.name() + " " + ninja.translator.get("title");
        document.getElementById("siteTitle").alt = janin.currency.name() + " " + ninja.translator.get("title");

        // Update i18n link
        document.getElementById("cultureen").href = "?culture=en&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("culturefr").href = "?culture=fr&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("culturede").href = "?culture=de&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("culturenl").href = "?culture=nl&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("cultureru").href = "?culture=ru&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("culturees").href = "?culture=es&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("cultureua").href = "?culture=ua&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("culturetr").href = "?culture=tr&currency=" + janin.currency.name().toLowerCase();
        document.getElementById("cultureit").href = "?culture=it&currency=" + janin.currency.name().toLowerCase();

        if(ninja.seeder.isDone())
        {
            // Regenerate a new wallet when not expensive
            ninja.wallets.singlewallet.generateNewAddressAndKey();
            ninja.wallets.paperwallet.build(document.getElementById('paperpassphrase').value);
            ninja.wallets.brainwallet.view();
        }

        // Reset wallet tab when expensive or not applicable
        document.getElementById("bulktextarea").value = "";
        document.getElementById("suppliedPrivateKey").value = "";

        // easter egg doge ;)
        if(janin.currency.name() == "Dogecoin")
        {
            janin.doge = new Doge(['wow', 'so paper wallet', 'such random', 'very pretty', 'much design', 'awesome', 'much crypto', 'such coin', 'wow!!', 'to da moon']);
            return;
        }

        if(janin.doge != null)
        {
            janin.doge.stop();
            janin.doge = null;
        }
    },
};

janin.currencies = [
    //                              name, networkVersion, privateKeyPrefix, WIF_Start, CWIF_Start, donate
    janin.currency.createCurrency ("42coin",              0x08, 0x88, "5",    "M"    , "4Fs42jYtLYrUMfKEXc6arojuhRsnYnerxN"),
    janin.currency.createCurrency ("Arepacoin",           0x17, 0x97, "6",    "P"    , "1J1HqJd2CRyacjEkMXxGzWVUYq6XfRqJEP"),
    janin.currency.createCurrency ("Bitcoin",             0x00, 0x80, "5",    "[LK]" , "15DHZzv7eBUwss77qczZiL3DUEZLjDYhbM"),
    janin.currency.createCurrency ("BitcoinCash",         0x00, 0x80, "5",    "[LK]" , "15DHZzv7eBUwss77qczZiL3DUEZLjDYhbM"),
    janin.currency.createCurrency ("BolivarCoin",         0x55, 0xd5, "8",    "Y"    , "1J1HqJd2CRyacjEkMXxGzWVUYq6XfRqJEP"),
    janin.currency.createCurrency ("Dash",                0x4c, 0xcc, "7",    "X"    , "XdYX6AbDzjb3AVL1tAmWjuYMD28LD9fcWS"),
    janin.currency.createCurrency ("Dogecoin",            0x1e, 0x9e, "6",    "Q"    , "D74Npoqhwhjw9fShkm5wbj6DD2BJXpmzPj"),
    janin.currency.createCurrency ("Litecoin",            0x30, 0xb0, "6",    "T"    , "LiScnsyPcqsyxn1fx92BcFguryXcw4DgCy"), 
    janin.currency.createCurrency ("Rilcoin",             0x31, 0xb1, "6",    "T"    , "1J1HqJd2CRyacjEkMXxGzWVUYq6XfRqJEP"),




    janin.currency.createCurrency ("Testnet Bitcoin",     0x6f, 0xef, "9",    "c"    , null),
    janin.currency.createCurrency ("Testnet Dogecoin",    0x71, 0xf1, "9",    "c"    , null),
                   ];
