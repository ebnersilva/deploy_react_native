---Tutorial de Deploy utilizando GithubActions e Fastlane---

  -Liberamos a pasta .git no vscode - Pesquise por excludes nas configurações do vscode
  - Gerar o arquivo keystore em um diretório para release utilizando o comando: 
    keytool -genkeypair -v -keystore buyzerapp.keystore -alias buyzerapp -keyalg RSA -keysize 2048 -validity 10000 
    <!-- Obs: Esse arquivo tem que estar salvo em android/app - É necessário colocar também no android/app/gradle.properties as seguintes chaves:  -->
  - Criar uma conta de serviço no Google Developer e salvar a key.json em um diretório

  - Instalar o GPG para criar a criptografia utilizando os comandos
    - ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    - brew install gnupg

  - Vá para o diretório que está a keystore e a chave_google.json
  - Após isso... vamos pegar o GPG para criptografar tanto nossa keystore quanto nossa ServiceKey.json
    -Comando para gerar a criptografia: gpg --symmetric --cipher-algo AES256 ~/tmpReactNative/deploy_rn
/deploy/Service_Key_Account_Android.json
    <!-- Necessita passar o caminho REAL da chave.json e do Keystore e também esse comando pedirá uma senha (essa senha vc usará para descriptografar)-->

  - Salve o keystore, keystore.GPG, chave_google.json, chave_google.json.gpg em: raiz_projeto/deploy

  - Criamos três variáveis ambiente no github (Para criar vá em configurações do repositório/secrets)
    ENCRYPT_PASSWORD=CHAVE_UTILIZADA_NO_GPG
    KEY_PASSWORD=CHAVE_UTILIZADA_NO_KEYSTORE
    STORE_PASSWORD=CHAVE_SERVIÇO_GOOGLE

  -Criamos um novo workflow no diretório .github/workflow/ com o nome publish.yml
  - Conteúdo:
    name: Publish iOS and Android App to App Store and Play Store

    on:
      release:
        type: [published]

    jobs:
      release-ios:
        name: Build and release iOS app
        runs-on: macOS-latest
        steps:
          - uses: actions/checkout@v1
          - uses: actions/setup-node@v1
            with:
              node-version: '10.x'
          - uses: actions/setup-ruby@v1
            with:
              ruby-version: '2.x'
          - name: Install Fastlane
            run: bundle install
          - name: Install packages
            run: yarn install

      release-android:
        name: Build and release Android app
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v1
          - uses: actions/setup-node@v1
            with:
              node-version: '10.x'
          - uses: actions/setup-ruby@v1
            with:
              ruby-version: '2.x'
          - name: Install Fastlane
            run: bundle install
          - name: Install packages
            run: yarn install

            # Executa o script para descriptografar o keystore e a chave de serviço google
          - name: Decrypt keystore and Google Credential
            run: ../../deploy/decrypt.sh
            env:
              ENCRYPT_PASSWORD: ${{ secrets.ENCRYPT_PASSWORD }}

            # Gera o bundle e upa para a Play Store
          - name: Bundle and Upload to PlayStore
            run: bundle exec fastlane build_and_release_to_play_store versionName:${{ github.event.release.tag_name }}
            env:
              STORE_PASSWORD: ${{ secrets.STORE_PASSWORD }}
              KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}

  - Depois criamos o arquivo Fastfile em raiz_projeto/fastlane/Fastfile para o fastlane utilizar
  com o seguinte conteúdo:

  lane :build_and_release_to_play_store do |options|
    # Get the custom build number
    buildNumber = get_custom_build_number

    # Bundle the app
    gradle(
      task: 'bundle',
      build_type: 'Release',
      project_dir: "android/",
      properties: {
        "versionName" => options[:versionName],
        "versionCode" => buildNumber
      }
    )

    # Upload to Play Store's Internal Testing
    upload_to_play_store(
      package_name: 'com.example.app',
      track: "internal",
      json_key: "./path/to/google-key.json",
      aab: "./android/app/build/outputs/bundle/release/app.aab"
    )
  end

  desc "Get the custom build number"
  private_lane :get_custom_build_number do
    buildNumber = File.read("metadata/buildNumber")

    puts buildNumber

    buildNumber
  end


-Para não acontecer o erro: Could not locate Gemfile crie um arquivo com o nome Gemfile na pasta raiz do projeto com o seguinte conteúdo:
  source "https://rubygems.org"

  gem "fastlane"

-Caso não saiba em qual diretório está... utilize a action abaixo para verifica-lo
  - name: CheckDirectory
    working-directory: ${{ github.workspace }}
    run: ls -la


<!-- Chave para descriptografar - keystore -->
  <!-- String para criptografia md5: hogsmead.2020.is.the.best -->
  <!-- MD5 da string acima: 89cc2a8b527b3b29e92ec752427f72a3 -->

<!-- Chave do keystore -->
  <!-- String para criptografia md5: hogsmead.2020.is.the.best -->
  <!-- MD5 da string acima: 89cc2a8b527b3b29e92ec752427f72a3 -->

<!-- Chave da conta de serviço: eae4f269ac301251571f9ce12bbd439e2acf5c35 -->
  