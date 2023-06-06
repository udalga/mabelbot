const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');

var prefix = ayarlar.prefix;
const otoCevaplar = new Map();

client.on('ready', () => {
  console.log('Botun Mabel artık aktif!');

  client.user.setPresence({
    activity: { name: 'Yeni durum' },
    status: 'idle' // Durumu ayarla: online, idle, dnd, invisible
  });

  client.user.setActivity('m!yardim', { type: 'STREAMING' });
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'örnek 1') {
    msg.reply('örnek 2');
  }

  if (!msg.content.startsWith(prefix)) {
    return;
  }

  if (msg.content.toLowerCase() === `${prefix}youtube`) {
    msg.reply('https://www.youtube.com/@Co-Ders');
  }

  if (msg.content.startsWith(`${prefix}de `)) {
    const messageContent = msg.content.slice(4); // !de'yi kaldır
    msg.reply(messageContent);
  }

  if (msg.content.toLowerCase() === `${prefix}bilgi`) {
    const embed = new Discord.MessageEmbed()
      .setTitle('Mabel Botunun Bilgileri')
      .setDescription('Bu bot, Discord.js kullanılarak Crev tarafından geliştirilmiştir.')
      .addField('Versiyon', '1.0.0')
      .addField('Geliştirici', 'Crev')
      .setColor('#7340ff');
    msg.channel.send(embed);
  }


  // Avatar Komutu
  if (msg.content.toLowerCase() === `${prefix}avatar`) {
    const avatar = msg.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
    msg.channel.send(avatar);
  }


  // Sunucu Bilgisi Komutu
  if (msg.content.toLowerCase() === `${prefix}sunucu`) {
    const guild = msg.guild;
    const guildName = guild.name;
    const memberCount = guild.memberCount;
    const guildOwner = guild.owner.user.tag;
    const guildRegion = guild.region;

    const embed = new Discord.MessageEmbed()
      .setTitle(`Sunucu Bilgileri - ${guildName}`)
      .addField('Üye Sayısı', memberCount)
      .addField('Sunucu Sahibi', guildOwner)
      .addField('Bölge', guildRegion)
      .setColor('#7340ff');

    msg.channel.send(embed);
  }


  //Yazıyı terse çevirme
  if (msg.content.toLowerCase().startsWith(`${prefix}ters`)) {
    const text = msg.content.slice(prefix.length + 5);
    const reversedText = text.split('').reverse().join('');
    msg.channel.send(reversedText);
  }


  //davet
  if (msg.content.toLowerCase() === `${prefix}davet`) {
    const inviteLink = 'https://discord.com/api/oauth2/authorize?client_id=1114863820331028611&permissions=8&scope=bot%20applications.commands';
    msg.channel.send(`Beni sunucuna davet etmek için: ${inviteLink}`);
  }


  // Yumruk Atma Komutu
  if (msg.content.toLowerCase().startsWith(`${prefix}yumruk`)) {
    const user = msg.mentions.users.first();
    if (!user) {
      return msg.reply('Yumruk atmak için bir kullanıcıyı etiketleyin.');
    }
    msg.channel.send(`${msg.author}, ${user} kullanıcısına yumruk attı!`);
  }







//rastgele
  if (msg.content.toLowerCase() === `${prefix}rastgele`) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    msg.channel.send(`Rastgele Sayı: ${randomNumber}`);
  }






//Emojiler
  if (msg.content.toLowerCase() === `${prefix}emojiler`) {
    const emojis = msg.guild.emojis.cache.map(emoji => emoji.toString()).join(' ');
    msg.channel.send(`Sunucudaki Emojiler: ${emojis}`);
  }





  // Kullanıcı Bilgisi Komutu
  if (msg.content.toLowerCase().startsWith(`${prefix}kullanici`)) {
    const user = msg.mentions.users.first() || msg.author;
    const member = msg.guild.member(user);
    const embed = new Discord.MessageEmbed()
      .setTitle(`${user.username} Kullanıcı Bilgisi`)
      .addField('ID', user.id)
      .addField('Sunucuya Katılma Tarihi', member.joinedAt.toDateString())
      .addField('Hesap Oluşturma Tarihi', user.createdAt.toDateString())
      .setThumbnail(user.avatarURL())
      .setColor('#7340ff');
    msg.channel.send(embed);
  }





  // Mesaj Silme Komutu
  if (msg.content.toLowerCase().startsWith(`${prefix}sil`)) {
    if (!msg.member.hasPermission('MANAGE_MESSAGES')) {
      return msg.reply('Bu komutu kullanma izniniz yok.');
    }
    const amount = parseInt(msg.content.split(' ')[1]);
    if (!amount || amount < 1 || amount > 100) {
      return msg.reply('Lütfen 1-100 arasında bir mesaj sayısı belirtin.');
    }
    msg.channel.bulkDelete(amount + 1)
      .then(deletedMessages => {
        msg.channel.send(`${deletedMessages.size - 1} adet mesaj silindi.`).then(sentMsg => {
          sentMsg.delete({ timeout: 3000 });
        });
      })
      .catch(err => {
        console.error(err);
        msg.reply('Mesajlar silinirken bir hata oluştu.');
      });
  }




//oylama
  if (msg.content.toLowerCase().startsWith(`${prefix}oylama`)) {
  if (!msg.member.hasPermission('MANAGE_MESSAGES')) {
    return msg.reply('Bu komutu kullanma izniniz yok.');
  }
  const question = msg.content.slice(prefix.length + 7);
  if (!question) {
    return msg.reply('Lütfen bir oylama sorusu belirtin.');
  }
  const embed = new Discord.MessageEmbed()
    .setTitle('Yeni Oylama')
    .setDescription(question)
    .setColor('#7340ff');
  msg.channel.send(embed)
    .then(sentMsg => {
      sentMsg.react('👍');
      sentMsg.react('👎');
    })
    .catch(err => {
      console.error(err);
      msg.reply('Oylama oluşturulurken bir hata oluştu.');
    });
}




//istatistik
if (msg.content.toLowerCase() === `${prefix}istatistik`) {
  const memberCount = msg.guild.memberCount;
  const onlineCount = msg.guild.members.cache.filter(m => m.presence.status === 'online').size;
  const idleCount = msg.guild.members.cache.filter(m => m.presence.status === 'idle').size;
  const dndCount = msg.guild.members.cache.filter(m => m.presence.status === 'dnd').size;
  const offlineCount = msg.guild.members.cache.filter(m => m.presence.status === 'offline').size;

  const embed = new Discord.MessageEmbed()
    .setTitle('Sunucu İstatistikleri')
    .addField('Üye Sayısı', memberCount)
    .addField('Çevrimiçi Üyeler', onlineCount)
    .addField('Boşta Üyeler', idleCount)
    .addField('Rahatsız Etmeyin Üyeler', dndCount)
    .addField('Çevrimdışı Üyeler', offlineCount)
    .setColor('#7340ff');
  msg.channel.send(embed);
}


if (msg.content.toLowerCase().startsWith(`${prefix}dm`)) {
  const user = msg.mentions.users.first();
  if (!user) {
    return msg.reply('Özel mesaj göndermek istediğiniz kullanıcıyı etiketleyin.');
  }

  const messageContent = msg.content.slice(prefix.length + 3); // Komutu ve etiketi kaldır
  user.send(messageContent)
    .then(() => {
      msg.reply('Özel mesaj başarıyla gönderildi.');
    })
    .catch(err => {
      console.error(err);
      msg.reply('Özel mesaj gönderilirken bir hata oluştu.');
    });
}

if (msg.content.toLowerCase() === `${prefix}ping`) {
  const ping = Math.round(client.ws.ping);
  msg.reply(`Ping: ${ping}ms`);
}

if (msg.content.toLowerCase().startsWith(`${prefix}rolver`)) {
  if (!msg.member.hasPermission('MANAGE_ROLES')) {
    return msg.reply('Bu komutu kullanma izniniz yok.');
  }

  const user = msg.mentions.users.first();
  if (!user) {
    return msg.reply('Rol vermek istediğiniz kullanıcıyı etiketleyin.');
  }

  const role = msg.mentions.roles.first();
  if (!role) {
    return msg.reply('Verilecek rolü etiketleyin.');
  }

  const member = msg.guild.member(user);
  if (!member) {
    return msg.reply('Belirttiğiniz kullanıcı sunucuda bulunamadı.');
  }

  member.roles.add(role)
    .then(() => {
      msg.reply(`${user.tag} kullanıcısına ${role.name} rolü verildi.`);
    })
    .catch(err => {
      console.error(err);
      msg.reply('Rol verirken bir hata oluştu.');
    });
}


if (msg.content.toLowerCase() === `${prefix}yardim`) {
  const embed = new Discord.MessageEmbed()
    .setTitle('Mabel Bot Yardım Menüsü')
    .setDescription('İşte Mabel botunun komutları:')
    .addField(`${prefix}youtube`, 'Youtube kanalına giden bir link döndürür.')
    .addField(`${prefix}de <mesaj>`, 'Belirtilen mesajı yazar.')
    .addField(`${prefix}bilgi`, 'Botun bilgilerini gösterir.')
    .addField(`${prefix}avatar`, 'Profil fotoğrafınızı gönderir.')
    .addField(`${prefix}sunucu`, 'Sunucu bilgilerini gösterir.')
    .addField(`${prefix}ters <mesaj>`, 'Belirtilen mesajı ters çevirir.')
    .addField(`${prefix}davet`, 'Botu sunucunuza davet etmek için gerekli bağlantıyı gönderir.')
    .addField(`${prefix}yumruk <@kullanıcı>`, 'Belirtilen kullanıcıya yumruk atar.')
    .addField(`${prefix}rastgele`, '1 ile 100 arasında rastgele bir sayı gönderir.')
    .addField(`${prefix}emojiler`, 'Sunucudaki emojileri gönderir.')
    .addField(`${prefix}kullanici <@kullanıcı>`, 'Belirtilen kullanıcının bilgilerini gösterir.')
    .addField(`${prefix}sil <sayı>`, 'Belirtilen miktarda mesajı siler (1-100 arası).')
    .addField(`${prefix}oylama <soru>`, 'Belirtilen soruyla oylama yapar (👍 ve 👎 emojileriyle).')
    .addField(`${prefix}istatistik`, 'Sunucu istatistiklerini gösterir.')
    .addField(`${prefix}dm <@kullanıcı> <mesaj>`, 'Belirtilen kullanıcıya özel mesaj gönderir.')
    .addField(`${prefix}ping`, 'Botun gecikme süresini gösterir.')
    .addField(`${prefix}rolver <@kullanıcı> <@rol>`, 'Belirtilen kullanıcıya belirtilen rolü verir.')
    .setColor('#7340ff');

  msg.reply(embed);
}









});

client.login(ayarlar.token);
