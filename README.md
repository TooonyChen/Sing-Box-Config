# 动态Sing-Box配置文件

基于 [Sub-Sotre](https://github.com/sub-store-org/Sub-Store) 和 [Sing-Box](https://github.com/SagerNet/sing-box) 实现的动态配置Sing-Box文件。可以让Sing-box做到手动/自动更新订阅。本项目大部分脚本都是从网上抄来改的，感谢各位开源大佬。

---

## 使用说明

1. 使用docker在服务器端创建sub store，记得更改变量`SUB_STORE_FRONTEND_BACKEND_PATH`的值，改成20位以内包含字母和数字的密码，并且记牢它。

```
	docker run -it -d \
	--restart=always \
	-e "SUB_STORE_CRON=55 23 * * *" \
	-e SUB_STORE_FRONTEND_BACKEND_PATH=/ChangeMeToUrPasswd \
	-p 0.0.0.0:31338:3001 \
	-v /etc/sub-store:/opt/app/data \
	--name sub-store \
	xream/sub-store
```

2. 在sub-store创建好你的订阅链接

3. 进入文件管理，新建文件，来源可以选择 [Tproxy配置文件](https://raw.githubusercontent.com/TooonyChen/Sing-Box-Dynamic-Config/refs/heads/main/SingBoxConfig_TProxy_DevVersion) 或者 [Tun配置文件](https://raw.githubusercontent.com/TooonyChen/Sing-Box-Dynamic-Config/refs/heads/main/SingBoxConfig_Tun_DevVersion)

4. 选择脚本操作，填入 [写入Outbound脚本](https://raw.githubusercontent.com/TooonyChen/Sing-Box-Dynamic-Config/refs/heads/main/scriptForAddingOutbound.js)

5. 保存，在文件管理中复制配置文件链接，稍后填入网关端的脚本中

6. 在你的Linux网关安装好 Sing-Box，安装步骤见 [Sing-Box官方文档](https://sing-box.sagernet.org/installation/package-manager/)

7. 请你把`/usr/bin/sing-box`和`/etc/sing-box`都改成777权限，以防奇怪的错误出现

8. 使用root权限运行脚本，如果你使用的是Tun模式，运行 [run_tun.sh](https://github.com/TooonyChen/Sing-Box-Dynamic-Config/blob/main/run_tun.sh) 。如果你使用的是Tproxy模式，运行 [run_tproxy.sh](https://github.com/TooonyChen/Sing-Box-Dynamic-Config/blob/main/run_tproxy.sh) 。请你把刚才复制的配置文件链接填入：`FULL_URL="https://XXXXXX/api/file/SingBox-Tproxy"`

9. sing-box面板链接为`[网关IP]:9095`,默认无密码。

10. 关于停止Sing-box：
    - Tun模式停止sing-box直接运行`systemctl stop sing-box`
    - Tproxy模式停止sing-box脚本: [stop_tproxy.sh](https://github.com/TooonyChen/Sing-Box-Config/blob/main/stop_tproxy.sh)

12. 如果要自动更新配置文件的话自己写`crontab`执行脚本就行，不多说了

13. 大功告成，enjoy!

---

## 待增加 / ToDo

- [ ] IPv6节点支持
