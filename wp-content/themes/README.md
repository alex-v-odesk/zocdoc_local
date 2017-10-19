## Zocdoc Careers

### Frontent Setup

run all commands from the root of the project folder.
```
npm install
```

### Watch folders and live reload.
```
npm run dev
```

### Build for deployment.
```
npm run deploy
```

### Server

Use your own apache server (MAMP, WAMP, Osx Apache...).

There's 1 Vhost to setup:

```
<VirtualHost zd-enh.local:80>

    DocumentRoot "/Users/mathias/Documents/Projects/zocdoc-enhancements/"
    
    ServerName zd-enh.local
    ServerAlias zd-enh.local

    <Directory "/Users/mathias/Documents/Projects/zocdoc-enhancements/">
        Options FollowSymLinks
        AllowOverride All
        Order allow,deny
        allow from all
        SetEnv APPLICATION_ENV build

        DirectoryIndex index.php
    </Directory>
  
</VirtualHost>
```

And add this line to /etc/hosts

```
127.0.0.1 zd-enh.local
```

Restart your apache and access :

```
zd-enh.local
```

### Database

An SQL dump can be found in the root folder of the project