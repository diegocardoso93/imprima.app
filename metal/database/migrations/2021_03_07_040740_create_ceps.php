<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCeps extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ceps', function (Blueprint $table) {
            $table->id();
            $table->string('cep')->unique()->index();
            $table->string('city');
            $table->string('uf');
            $table->string('neighborhood')->nullable();
            $table->string('address')->nullable();
            $table->string('address_extra')->nullable();
            $table->timestamps();
        });
    }

    //01002900	São Paulo/SP	Centro	Viaduto do Chá, 15 	 Prefeitura do Município de São Paulo

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cep_address');
    }
}