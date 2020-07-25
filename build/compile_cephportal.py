# -*- coding:utf-8 -*-
import argparse
import os
import subprocess
import platform
import logging
import sys
import datetime

class Conf(object):
    PYTHONVERSION = "2.7"

    def __init__(self,parser):
        self.projectDir = os.path.abspath(os.path.join(os.path.dirname(__file__),os.pardir))

        self.outputDir = os.path.join(self.projectDir,"buildlog")

        self.logfile = None
        if (parser.log):
            if (not os.path.exists(self.outputDir)):
                os.makedirs(self.outputDir)
            self.logfile =  os.path.join(self.outputDir,parser.log)
        self.nodeVersion  = self.__getNodeVersion()
        self.logger = self.initLogger()

    def __getNodeVersion(self):
        sCmd = "node --version"
        output = subprocess.check_output([sCmd],shell=True)
        return output.strip('\n');
    def __str__(self):
        conf = []
        conf.append("system : %s"%platform.system())
        conf.append("node version : %s"%self.nodeVersion)
        conf.append("python version :%s"%platform.python_version())
        return "\n".join(conf)

    def checkEnv(self):
        errMsg = []
        if ("Linux" != platform.system()):
            errMsg.append("system is not Linux")
        if (Conf.PYTHONVERSION > platform.python_version()):
            errMsg.append("python version need %s+"%(Conf.PYTHONVERSION))
        return errMsg
    def initLogger(self):
        '''
        '''
        build_logger = logging.getLogger('ciscript')
        build_logger.setLevel(logging.DEBUG)
        formatter  = logging.Formatter('%(asctime)s %(name)-12s %(levelname)-8s %(message)s', '%H:%M:%S')
        if (self.logfile):
            file_handler = logging.FileHandler(self.logfile,mode='w')
            file_handler.setFormatter(formatter)
            build_logger.addHandler(file_handler)
        else:
            stream_handler = logging.StreamHandler(sys.stdout)
            stream_handler.setFormatter(formatter)
            build_logger.addHandler(stream_handler)
        return build_logger

def copy_nodemodule(conf):
    artifact_user='zx_cms-ci'
    artifact_pwd='AP6Go3CMpUwoWZqBPmVwF1wAUqALJAa57JjDdS'
    artifact_url='https://artnj.zte.com.cn/artifactory/zx_cms-alpha-generic/base-comp_%5BIaaS.DevOps.config%5D/node_modules-ngportal/'
    artifact_package='20200617155006_node_modules-ng6.tar.gz'
    downloadTask = "curl -u " + artifact_user + ":" + artifact_pwd + " -Og " + artifact_url + artifact_package
    unzipTask = "tar xf ./" + artifact_package + " -C ./"
    starttime = datetime.datetime.now()
    res = execmd(conf,downloadTask)
    endtime = datetime.datetime.now()
    conf.logger.info("==>time of download node_modules package %s is %d SecondSS"%(artifact_package, (endtime - starttime).seconds))
    if (res  != os.EX_OK):
        return res
    starttime1 = datetime.datetime.now()
    execmd(conf,unzipTask)
    endtime1 = datetime.datetime.now()
    conf.logger.info("==>time of tar node_modules is %d seconds"%((endtime1 - starttime1).seconds))
    return res

def initArgParse():
    parser = argparse.ArgumentParser(description='This is a tool to build cephportal')
    parser.add_argument('--log',  action="store", dest="log", help='output log file')
    parser.add_argument('--version', action='version', version='%(prog)s 1.0')
    parser.add_argument('--product',  action="store", help='Show Product Name, eg: provider or uniview')
    return parser.parse_args()

def execmd(conf,sCmd):
    curdir = os.getcwd()
    os.chdir(conf.projectDir)
    process = subprocess.Popen([sCmd],stdout=subprocess.PIPE,  stderr=subprocess.STDOUT ,shell=True)
    while True:
        line = process.stdout.readline()
        if not line:
            break
        conf.logger.info(line)
    os.chdir(curdir)
    return process.wait()

def workflow(conf):
    res = os.EX_OK
# copy_nodemodule(conf)
#if (res != os.EX_OK):
#    conf.logger.error("rsync nodemodule fail:exit %s"%res)
#    return res
    for cmd in WORKFLOW:
        res = execmd(conf,cmd)
        if (res != os.EX_OK):
            conf.logger.error("%s fail:exit %s"%(cmd,res))
            return res
    return res

def parseArg(parser):
    results = parser.parse_args()

if __name__ == '__main__':
    parser  = initArgParse()
    conf = Conf(parser)

    WORKFLOW = ['rm -fr ./cephportal','rm -fr ./cephportal.tar.gz','rm -fr ./dist','npm run build','mv ./dist ./cephportal','tar cvf cephportal.tar ./cephportal','tar zcvf cephportal.tar.gz ./cephportal','mv -f cephportal.tar ./build','mv -f cephportal.tar.gz ./build']
    conf.logger.info(conf)

    checkRes = conf.checkEnv()
    if (checkRes) :
        conf.logger.critical('''
****env check fail exit********************
%s
****env check fail exit*********************
'''%"\n".join(checkRes))
        exit( os.EX_OSERR)

    exit(workflow(conf))


